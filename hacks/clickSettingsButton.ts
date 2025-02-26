import { unlockAllSongs } from "../utilities/unlockAllSongs";

export const clickSettingsButton = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("OptionsDialog")
    .method("SettingsButtonPressed").implementation = function () {
    unlockAllSongs();
    this.method("SettingsButtonPressed").invoke();
  };
};
