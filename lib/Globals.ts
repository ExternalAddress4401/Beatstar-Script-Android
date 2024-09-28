import { Score } from "../utilities/getScores.js";
import DataCache from "./DataCache.js";

let customSongs: any[] = [];
let lastNote: any = null;
let dataCache: DataCache;
let scores: Score[];
let offline: boolean = false;

const setLastNote = (value: any) => {
  lastNote = value;
};

const setCustomSongs = (value: any) => {
  customSongs = value;
};

const setDataCache = (value: DataCache) => {
  dataCache = value;
};

const setScores = (value: Score[]) => {
  scores = value;
};

const setOffline = (value: boolean) => {
  offline = value;
};

export {
  customSongs,
  lastNote,
  dataCache,
  scores,
  offline,
  setLastNote,
  setCustomSongs,
  setDataCache,
  setScores,
  setOffline,
};
