import "frida-il2cpp-bridge";

import Device from "../lib/Device.js";
import { lengthFixer } from "../functions/lengthFixer.js";
import { unlockAllSongs } from "../hacks/unlockAllSongs.js";
import { unlockCustomSongs } from "../hacks/unlockCustomSongs.js";
import { getScores } from "../utilities/getScores.js";
import { offline, scores } from "../lib/Globals.js";
import { hookGraphics } from "../hacks/graphics.js";

Il2Cpp.perform(async () => {
  await getScores();
  Device.toast(
    offline ? `Mod loaded with ${scores.length} scores.` : "Mod loaded offline."
  );
  unlockAllSongs();
  unlockCustomSongs();
  lengthFixer();
  hookGraphics();
});
