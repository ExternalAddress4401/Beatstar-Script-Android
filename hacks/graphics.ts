import Logger from "../lib/Logger.js";
import SettingsReader from "../lib/SettingsReader.js";

export function hookGraphics() {
  const assembly = Il2Cpp.domain.assembly("SpaceApe.Scaling.Runtime").image;
  const rakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
  const setting = SettingsReader.getSetting("graphics");
  const fps = SettingsReader.getSetting("fps") as number;

  if (setting) {
    Logger.log("Settings graphics to " + setting);
    assembly
      .class("com.spaceape.scaling.ScalingConfig")
      .method("GetLevelById").implementation = function () {
      return this.method("GetLevelById").invoke(
        Il2Cpp.string("android_" + setting)
      );
    };
  }
  if (fps) {
    Logger.log("Setting FPS to " + fps);
    Il2Cpp.gc
      .choose(
        rakshaModel.class("com.spaceape.config.FlamingoScalingModuleTemplate")
      )
      .forEach((instance: Il2Cpp.Object) => {
        instance.field("Fps").value = fps;
        instance.field("MenuFps").value = fps;
      });
  }
}
