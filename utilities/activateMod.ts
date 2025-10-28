import { freeRestarts } from "../hacks/freeRestarts.js";
import { noFail } from "../functions/noFail.js";
import { autoplay } from "../functions/autoplay.js";
import { forcePlayableSongs } from "../hacks/forcePlayableSongs.js";
import { disableTutorial } from "../functions/disableTutorial.js";

export const activateMod = () => {
  freeRestarts();
  noFail();
  autoplay();
  //forcePlayableSongs();
  disableTutorial();
};
