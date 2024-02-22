import fs from "frida-fs";
import { networkRequest } from "../lib/Utilities.js";
import Logger from "../lib/Logger.js";

const getLocalVersion = () => {
  try {
    return fs.readFileSync("sdcard/beatstar/script/version").toString();
  } catch (e) {
    return "0.0.0.0";
  }
};

const getLiveVersion = async (): Promise<string> => {
  return new Promise(function (resolve, reject) {
    try {
      networkRequest("/version", {
        version: getLocalVersion(),
      }).then((liveVersion: string) => {
        resolve(liveVersion);
      });
    } catch (e) {
      const error = e as Error;
      Logger.log(`Got an error contacting the server: ${error.message}`);
    }
  });
};

export { getLocalVersion, getLiveVersion };
