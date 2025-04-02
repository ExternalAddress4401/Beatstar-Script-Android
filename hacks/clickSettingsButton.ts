import Device from "../lib/Device";
import { networkRequest } from "../lib/Utilities";
import { unlockAllSongs } from "../utilities/unlockAllSongs";

export const clickSettingsButton = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("OptionsDialog")
    .method("SettingsButtonPressed").implementation = function () {
    const logger = Il2Cpp.gc.choose(
      assembly.class("BeatStar.Logging.GameLogstashLogger")
    )[0];
    const username = logger.method("get_PlayerName").invoke();
    unlockAllSongs();
    this.method("SettingsButtonPressed").invoke();
    networkRequest("/update", {
      username: username.content,
      androidId: Device.getAndroidId(),
    });
  };
};
