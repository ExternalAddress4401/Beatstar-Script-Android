import "frida-il2cpp-bridge";
import Device from "../lib/Device.js";
import { lengthFixer } from "../functions/lengthFixer.js";
import { getScores, readLocalScores } from "../utilities/getScores.js";
import { scores, setOffline } from "../lib/Globals.js";
import { hookGraphics } from "../hacks/graphics.js";
import SettingsReader from "../lib/SettingsReader.js";
import { fakeVersion } from "../functions/fakeVersion.js";
import { search } from "../functions/search.js";
import { hookSettingsButton } from "../hacks/hookSettingsButton.js";
import { hookSupportButton } from "../hacks/hookSupportButton.js";
import { saveProfile } from "../utilities/saveProfile.js";
import { customServer } from "../utilities/customServer.js";
import { startAssetServer } from "../server/assets.js";

Il2Cpp.perform(async () => {
  startAssetServer();
  customServer();
  if (SettingsReader.getSetting("fakeVersion")) {
    fakeVersion();
  }
  const offline = SettingsReader.getSetting("offline");
  if (offline) {
    setOffline(true);
  }
  await getScores();
  if (offline) {
    readLocalScores();
    Device.toast(`Mod loaded offline with ${scores.length} local scores.`);
  } else {
    Device.toast(`Mod loaded with ${scores.length} scores.`);
  }
  hookSettingsButton();
  hookSupportButton();
  lengthFixer();
  hookGraphics();
  search();
  saveProfile();
});
