import Device from "../lib/Device";
import { deviceNetworkRequest } from "../lib/Utilities";

export const saveUserame = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  const logger = Il2Cpp.gc.choose(
    assembly.class("BeatStar.Logging.GameLogstashLogger")
  )[0];
  const username = logger.method("get_PlayerName").invoke();

  deviceNetworkRequest("/update", {
    username: username.content,
    androidId: Device.getAndroidId(),
  });
};
