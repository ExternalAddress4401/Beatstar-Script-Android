import { lastNote, setLastNote } from "../lib/Globals.js";
import SettingsReader, { Color } from "../lib/SettingsReader.js";

export const customColors = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("BeatStar.RhythmGame.RhythmGameColours")
    .method("GetLaneColourForScore").implementation = function (
    scoreType: any
  ) {
    let result = this.method("GetLaneColourForScore").invoke(
      scoreType
    ) as Il2Cpp.Object;
    if (scoreType.toString() == "APLUS" || lastNote) {
      let customColor = SettingsReader.getSetting("aPlusColor") as Color;
      if (customColor) {
        result.field("r").value = customColor.r;
        result.field("g").value = customColor.g;
        result.field("b").value = customColor.b;
        result.field("a").value = customColor.a;
      } else {
        result.field("r").value = 1;
        result.field("g").value = 0;
        result.field("b").value = 1;
        result.field("a").value = 1;
      }
      setLastNote(null);
    } else if (scoreType.toString() == "A") {
      let customColor = SettingsReader.getSetting("aColor") as Color;
      if (customColor) {
        result.field("r").value = customColor.r;
        result.field("g").value = customColor.g;
        result.field("b").value = customColor.b;
        result.field("a").value = customColor.a;
      }
    } else if (scoreType.toString() == "B") {
      let customColor = SettingsReader.getSetting("bColor") as Color;
      if (customColor) {
        result.field("r").value = customColor.r;
        result.field("g").value = customColor.g;
        result.field("b").value = customColor.b;
        result.field("a").value = customColor.a;
      }
    }
    return result;
  };
  assembly
    .class("BeatStar.RhythmGame.RhythmGameColours")
    .method("GetFeedbackTextColourForScore").implementation = function (
    scoreType: any
  ) {
    let result = this.method("GetFeedbackTextColourForScore").invoke(
      scoreType
    ) as Il2Cpp.Object;
    if (scoreType.toString() == "APLUS" || lastNote) {
      let customColor = SettingsReader.getSetting("aPlusColor") as Color;
      if (customColor) {
        result.field("r").value = customColor.r;
        result.field("g").value = customColor.g;
        result.field("b").value = customColor.b;
        result.field("a").value = customColor.a;
      } else {
        result.field("r").value = 1;
        result.field("g").value = 0;
        result.field("b").value = 1;
        result.field("a").value = 1;
      }
      setLastNote(null);
    } else if (scoreType.toString() == "A") {
      let customColor = SettingsReader.getSetting("aColor") as Color;
      if (customColor) {
        result.field("r").value = customColor.r;
        result.field("g").value = customColor.g;
        result.field("b").value = customColor.b;
        result.field("a").value = customColor.a;
      }
    } else if (scoreType.toString() == "B") {
      let customColor = SettingsReader.getSetting("bColor") as Color;
      if (customColor) {
        result.field("r").value = customColor.r;
        result.field("g").value = customColor.g;
        result.field("b").value = customColor.b;
        result.field("a").value = customColor.a;
      }
    }
    return result;
  };
};
