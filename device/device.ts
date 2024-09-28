import "frida-il2cpp-bridge";

import Device from "../lib/Device.js";
import { lengthFixer } from "../functions/lengthFixer.js";
import { unlockAllSongs } from "../hacks/unlockAllSongs.js";
import { unlockCustomSongs } from "../hacks/unlockCustomSongs.js";
import { getScores, readLocalScores } from "../utilities/getScores.js";
import { offline, scores } from "../lib/Globals.js";
import { hookGraphics } from "../hacks/graphics.js";

Il2Cpp.perform(async () => {
  await getScores();
  if (offline) {
    readLocalScores();
    Device.toast(`Mod loaded offline with ${scores.length} local scores.`);
  } else {
    Device.toast(`Mod loaded with ${scores.length} scores.`);
  }
  unlockAllSongs();
  unlockCustomSongs();
  lengthFixer();
  hookGraphics();
});
