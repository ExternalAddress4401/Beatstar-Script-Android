import Device from "../lib/Device";
import { setScores } from "../lib/Globals";
import Logger from "../lib/Logger";
import { deviceNetworkRequest } from "../lib/Utilities";

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
    Logger.log(`Scores: ${JSON.stringify(scores)}`);
    setScores(JSON.parse(scores));
    resolve();
  });
};
