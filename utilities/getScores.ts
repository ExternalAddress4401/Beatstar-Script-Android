import { BufferedWriter } from "../lib/BufferedWriter";
import Device from "../lib/Device";
import { setOffline, setScores } from "../lib/Globals";
import Logger from "../lib/Logger";
import { deviceNetworkRequest } from "../lib/Utilities";
import fs from "frida-fs";
import { Buffer } from "buffer";

export interface Score {
  beatmapId: number;
  score: number;
}

export const getScores = () => {
  Logger.log("Fetching scores...");
  return new Promise<void>(async function (resolve, reject) {
    const scores = (await deviceNetworkRequest("/getScores", {
      androidId: Device.getAndroidId(),
    })) as string;
    if (scores === null) {
      console.log("offline");
      setOffline(true);
    } else {
      //write scores
      writeScores(scores);
      Logger.log(`Scores: ${JSON.stringify(scores)}`);
      setScores(JSON.parse(scores));
    }
    resolve();
  });
};

const writeScores = (scores: any) => {
  const s = JSON.parse(scores);
  const writer = new BufferedWriter();
  for (const score of s) {
    writer.writeInt(score.beatmapId);
    writer.writeInt(score.score);
  }

  // Yes, Buffer.from is necessary here. The full size of the buffer is written if it's omitted instead of only the filled portion.
  fs.writeFileSync("sdcard/beatstar/scores", Buffer.from(writer.getBuffer()));
};
