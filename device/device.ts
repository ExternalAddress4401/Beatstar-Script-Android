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

Il2Cpp.perform(async () => {
  Device.toast("Mod loaded.");

  activateMod();
  hookCintaId();
  startAssetServer();
  customServer();
  hookSupportButton();
  lengthFixer();
  hookGraphics();
  search();
});
