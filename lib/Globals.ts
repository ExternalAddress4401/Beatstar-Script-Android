import DataCache from "./DataCache.js";

let customSongs: any[] = [];
let dataCache: DataCache;
let cinta: string;

const setCinta = (str: string) => {
  cinta = str;
};

const setCustomSongs = (value: any) => {
  customSongs = value;
};

const setDataCache = (value: DataCache) => {
  dataCache = value;
};

export {
  customSongs,
  dataCache,
  cinta,
  setCustomSongs,
  setDataCache,
  setCinta,
};
