import { killErrorHandler } from "../utilities/killErrorHandler.js";
import { disableChecksum } from "../hacks/disableChecksum.js";
import { customColors } from "../functions/customColors.js";
import { freeUnlimitedPlay } from "../hacks/freeUnlimitedPlay.js";
import { freeRestarts } from "../hacks/freeRestarts.js";
import { saveScores } from "../server/saveScores.js";
import { unlockAllSkins } from "../hacks/unlockAllSkins.js";
import { noFail } from "../functions/noFail.js";
import { autoplay } from "../functions/autoplay.js";
import { search } from "../functions/search.js";
import { forcePlayableSongs } from "../hacks/forcePlayableSongs.js";
import { disableTutorial } from "../functions/disableTutorial.js";
import { disableNews } from "../functions/disableNews.js";

export const activateMod = () => {
  killErrorHandler();
  disableChecksum();
  customColors();
  freeUnlimitedPlay();
  freeRestarts();
  saveScores();
  unlockAllSkins();
  noFail();
  autoplay();
  forcePlayableSongs();
  disableTutorial();
  disableNews();
};
