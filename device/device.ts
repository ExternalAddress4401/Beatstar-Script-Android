import "frida-il2cpp-bridge";
import Device from "../lib/Device.js";
import { lengthFixer } from "../functions/lengthFixer.js";
import { hookGraphics } from "../hacks/graphics.js";
import { search } from "../functions/search.js";
import { hookSupportButton } from "../hacks/hookSupportButton.js";
import { customServer } from "../utilities/customServer.js";
import { startAssetServer } from "../server/assets.js";
import { hookCintaId } from "../private-server/hookCintaId.js";
import { activateMod } from "../utilities/activateMod.js";
import { logErrors } from "../utilities/logErrors.js";
import { customColors } from "../functions/customColors.js";
import { saveDeviceId } from "../functions/saveDeviceId.js";
import SettingsReader from "../lib/SettingsReader.js";
import Logger from "../lib/Logger.js";
import { hookScoring } from "../customs/hookScoring.js";
import { startAssetServer } from "../server/assets.js";

Il2Cpp.perform(async () => {
  Device.toast("Mod loaded.");
  startAssetServer();

  Logger.log("Hooking cinta ID");
  hookCintaId();
  Logger.log("Hooking custom server");
  startAssetServer();
  customServer();
  Logger.log("Saving device ID");
  saveDeviceId();
  Logger.log("Applying custom colors");
  customColors();
  Logger.log("Checking for logErrors");
  if (SettingsReader.getSetting("logErrors")) {
    Logger.log("logErrors is on");

    logErrors();
  }
  Logger.log("Activating mod");
  activateMod();
  Logger.log("Hooking support button");
  hookSupportButton();
  Logger.log("Applying length fixer");
  lengthFixer();
  Logger.log("Hooking graphics");
  hookGraphics();
  Logger.log("Hooking search");
  search();
  hookScoring();
});
