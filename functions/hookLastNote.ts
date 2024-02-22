import { setLastNote } from "../lib/Globals.js";

export const hookLastNote = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("BeatStar.RhythmGame.GameController")
    .method("FlickStart").implementation = function (
    interaction: any,
    time: any
  ) {
    setLastNote(interaction);
    this.method("FlickStart").invoke(interaction, time);
  };
};
