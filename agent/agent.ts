import "frida-il2cpp-bridge";
import Java from "frida-java-bridge";
import Logger from "../lib/Logger.js";
import SettingsReader from "../lib/SettingsReader.js";
import Device from "../lib/Device.js";
import fs from "frida-fs";
import { getLiveVersion, getLocalVersion } from "../utilities/Versioner.js";
import { decrypt } from "../lib/Encrypter.js";
import { Buffer } from "buffer";
import { sleep } from "../utilities/sleep.js";
import { isUndefined } from "../utilities/isUndefined.js";
import {
  createDirectories,
  getJavaVersion,
  networkRequest,
} from "../lib/Utilities.js";

type RPCStatus =
  | "NO_ACTION"
  | "EXECUTE"
  | "EXECUTE_LOCAL"
  | "SERVER_DOWN"
  | "NEW_VERSION";

let done: RPCStatus;

function checkForStoragePermissions() {
  if (getJavaVersion() <= 10) {
    Logger.log("On Andoid 10 so can't show permissions screen.");
    return true;
  }

  const Environment = Java.use("android.os.Environment");
  if (!Environment.isExternalStorageManager()) {
    const context = Java.use("android.app.ActivityThread")
      .currentApplication()
      .getApplicationContext();
    const intentClass = Java.use("android.content.Intent");
    const Settings = Java.use("android.provider.Settings");
    const uri = Java.use("android.net.Uri").parse(
      `package:${context.getPackageName()}`
    );
    const intent = intentClass.$new(
      Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION.value,
      uri
    );
    intent.addFlags(268435456);

    Device.toast(
      "You're missing storage permissions. Add them here and restart."
    );

    context.startActivity(intent);

    return false;
  }

  return true;
}

//this runs before the entry point so we can do our network requests here
rpc.exports = {
  init(stage, parameters) {
    return new Promise<void>(function (resolve, reject) {
      if (stage === "early") {
        Logger.log("Running RPC");
        run().then(function (status) {
          Logger.log(`Finished RPC with status ${status}`);
          done = status;
          resolve();
        });
      }
    });
  },
};

Il2Cpp.perform(async () => {
  Java.perform(() => {
    if (SettingsReader.getSetting("forceLogin") === "true") {
      showLoginScreen();
    }
  });
  Logger.log(`Inside perform block with ${done}`);

  createNewUser();

  Logger.log("Finished init");

  if (!checkForStoragePermissions()) {
    return;
  }
  switch (done) {
    case "EXECUTE":
      executeScript();
      break;
    case "EXECUTE_LOCAL":
      Device.toast("Running local script.");
      executeScript();
      break;
    case "NEW_VERSION":
      Device.toast(
        "Script updated. Please restart Beatstar unless following #instructions."
      );
      break;
    case "SERVER_DOWN":
      Device.toast("Server looks to be down.");
      break;
  }
}, "main");

const showLoginScreen = () => {
  const loginRuntime = Il2Cpp.domain.assembly("SpaceApe.Login.Runtime").image;

  loginRuntime.class("LoginPicker").method(".ctor").implementation = function (
    a,
    b,
    c,
    d
  ) {
    this.method(".ctor").invoke(a, b, c, d);
    this.method("ShowPlayerLogin").invoke();
  };
};

const createNewUser = () => {
  Logger.log("Checking if it's out first time using the mod...");
  networkRequest("/createAccount", { androidId: Device.getAndroidId() });
};

const shouldLoadScript = () => {
  return SettingsReader.getSetting("loadScript") !== "false";
};

const isServerModified = () => {
  return (
    !isUndefined(SettingsReader.getSetting("ip")) ||
    !isUndefined(SettingsReader.getSetting("port"))
  );
};

const hasLocalScript = () => {
  try {
    fs.readFileSync("sdcard/beatstar/script/override.js");
    return true;
  } catch (e) {
    return false;
  }
};

const executeScript = async () => {
  const path =
    done === "EXECUTE"
      ? "sdcard/beatstar/script/script.js"
      : "sdcard/beatstar/script/override.js";

  const script: any = fs.readFileSync(path);
  const code = Buffer.from(script.toString(), "base64").toString();
  const decrypted = decrypt(code);

  //the script should be responsible for showing "Mod loaded." so we don't get false positives

  try {
    eval(decrypted);
  } catch (e) {
    const error = e as Error;
    Logger.log(`Error running script: ${error.message}`);
  }
};

const handleDelay = async () => {
  const delay = SettingsReader.getSetting("delay") as number;
  if (delay) {
    await sleep(delay);
  }
  return;
};

async function run(): Promise<RPCStatus> {
  createDirectories();
  if (!shouldLoadScript()) {
    Logger.log("Not loading script due to settings file.");
    Device.toast("Not loading script due to settings file");
    return "NO_ACTION";
  }
  if (isServerModified()) {
    Logger.log("Server is modified.");
    Device.toast(
      "Modified server configuration detected. Do not report bugs that occur from this."
    );
  }

  if (hasLocalScript()) {
    Logger.log("Found a local script. Loading that instead.");
    return "EXECUTE_LOCAL";
  }

  Logger.log("Doing version checks");
  const localVersion = getLocalVersion();
  Logger.log("Local version: " + localVersion);
  const liveVersion = await getLiveVersion();
  Logger.log("Live version: " + liveVersion);

  return new Promise(async function (resolve, reject) {
    if (liveVersion === null) {
      Logger.log("Loading offline.");
      resolve("EXECUTE");
    } else if (localVersion !== liveVersion) {
      Logger.log("Versions don't match");
      const response = (await networkRequest("/script")) as string;

      try {
        fs.writeFileSync("sdcard/beatstar/script/script.js", response);
        fs.writeFileSync("sdcard/beatstar/script/version", liveVersion!);
      } catch (e) {
        const error = e as Error;
        console.log(error.message);
      }

      resolve("NEW_VERSION");
    } else {
      resolve("EXECUTE");
    }
  });
}
