import SettingsReader, { Color } from "../lib/SettingsReader.js";

const createColor = (r: number, g: number, b: number, a: number) => {
  const core = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
  const color = core.class("UnityEngine.Color").alloc();
  color.method(".ctor").invoke(r, g, b, a);

  return color;
};

export const customColors = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
  const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;

  assembly
    .class("BeatStar.RhythmGame.RhythmGameColours")
    .method("PostInjectInitialise").implementation = function () {
    this.method("PostInjectInitialise").invoke();

    const aPlus = RakshaModel.class("com.spaceape.config.ScoreType").field(
      "APLUS"
    ).value;
    const a = RakshaModel.class("com.spaceape.config.ScoreType").field(
      "A"
    ).value;
    const b = RakshaModel.class("com.spaceape.config.ScoreType").field(
      "B"
    ).value;

    const laneColors = this.field("laneColoursByScore").value;
    const textColors = this.field("feedbackTextColoursByScore").value;
    const aPlusColor = SettingsReader.getSetting("aPlusColor") as Color;
    const aColor = SettingsReader.getSetting("aColor") as Color;
    const bColor = SettingsReader.getSetting("bColor") as Color;

    const aPlusColorStruct = createColor(
      aPlusColor?.r ?? 1,
      aPlusColor?.g ?? 0,
      aPlusColor?.b ?? 1,
      aPlusColor?.a ?? 1
    );

    laneColors.method("set_Item").invoke(aPlus, aPlusColorStruct.unbox());
    textColors.method("set_Item").invoke(aPlus, aPlusColorStruct.unbox());

    if (aColor) {
      const aColorStruct = createColor(aColor.r, aColor.g, aColor.b, aColor.a);
      laneColors.method("set_Item").invoke(a, aColorStruct.unbox());
      textColors.method("set_Item").invoke(a, aColorStruct.unbox());
    }
    if (bColor) {
      const bColorStruct = createColor(bColor.r, bColor.g, bColor.b, bColor.a);
      laneColors.method("set_Item").invoke(b, bColorStruct.unbox());
      textColors.method("set_Item").invoke(b, bColorStruct.unbox());
    }
  };
};
