import { customSongs, offline, scores, setScores } from "../lib/Globals.js";
import { getStatus } from "../functions/autoplay.js";
import SettingsReader from "../lib/SettingsReader.js";
import Beatcharts from "../lib/Beatcharts.js";
import { deviceNetworkRequest } from "../lib/Utilities.js";
import Device from "../lib/Device.js";
import Logger from "../lib/Logger.js";
import { writeScores } from "../utilities/getScores.js";

export const saveScores = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
  const mscorlib = Il2Cpp.domain.assembly("mscorlib").image;

  assembly
    .class("BeatStarRhythmGameFlowListener")
    .method("ShowResults").implementation = function (result: any) {
    const score = result.field("Score").value as Il2Cpp.Object;
    const gameResult = result.field("GameResult").value as Il2Cpp.Object;
    const beatmap = gameResult.field("Beatmap").value as Il2Cpp.Object;
    const beatmapId = beatmap.field("id").value;
    let scoreCounts = gameResult.field("ScoreTypeCounts")
      .value as Il2Cpp.Object;
    const SystemInt32 = mscorlib.class("System.Int32");

    const values = scoreCounts.method("get_Values").invoke() as Il2Cpp.Object;
    const count = values.method("get_Count").invoke() as number;
    const array = Il2Cpp.array(SystemInt32, count);
    values.method("CopyTo").invoke(array, 0);

    /*const accuracy = {
              perfectPlus: array[5],
              early: array[4],
              great: array[3],
              perfect: array[2],
              miss: array[1],
              none: array[0]
          }*/

    //don't send custom scores to database
    let shouldSave = getStatus() === "Autoplay enabled" ? false : true;

    for (var x = 0; x < customSongs.length; x++) {
      const customSongId = customSongs[x].template.field("id").value;
      if (beatmapId.toString() == customSongId.toString()) {
        const song = customSongs[x];
        //this is a custom song so send intent to beatcharts

        if (!SettingsReader.getSetting("disableScoreSync")) {
          Logger.log("Syncing to beatcharts");
          Beatcharts.sync(song, score);
        }
        break;
      }
    }

    const absoluteScore = score.field("absoluteScore").value as number;

    if (shouldSave) {
      if (!offline) {
        deviceNetworkRequest("/saveScore", {
          androidId: Device.getAndroidId(),
          score: absoluteScore,
          beatmapId,
        });
      }

      // Does the score exist locally?
      const s = scores.find((score) => score.beatmapId === beatmapId);
      if (!s) {
        scores.push({
          beatmapId,
          score: absoluteScore,
        });
      }

      // Update local scores
      setScores(
        scores.map((score) =>
          score.beatmapId === beatmapId
            ? {
                ...score,
                score:
                  score.score < absoluteScore ? absoluteScore : score.score,
              }
            : score
        )
      );
      writeScores(JSON.stringify(scores));
    }

    return this.method("ShowResults").invoke(result);
  };
};
