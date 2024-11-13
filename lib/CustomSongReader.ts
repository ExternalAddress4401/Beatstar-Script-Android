//@ts-nocheck

import BeatmapTemplate from "./BeatmapTemplate.js";
import DataCache from "./DataCache.js";
import Device from "./Device.js";
import Logger from "./Logger.js";

export default class CustomSongReader {
  dataCache: DataCache;

  constructor(dataCache: DataCache) {
    this.dataCache = dataCache;
  }
  async readCustomSongsOnDevice() {
    const lang = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
    const brokenSongs = [];
    const promises = [];

    let file = Java.use("java.io.File");
    let moddedFiles = [];
    let files = file.$new("sdcard/beatstar/songs").listFiles();

    const langConfig = Il2Cpp.gc.choose(
      lang.class("com.spaceape.sharedlang.LangConfig")
    )[0];
    const originalTranslations = langConfig.field("translations")
      .value as Il2Cpp.Array;
    const originalTranslation = originalTranslations.get(0) as Il2Cpp.Object;

    for (var x = 0; x < files.length; x++) {
      promises.push(
        new Promise((resolve, reject) => {
          const index = x;
          let data = this.readFileOnDevice(`${files[x]}/info.json`);

          data.path = `file:///${files[x]}/`;

          let t = new BeatmapTemplate(parseInt(data.id), data.path);

          let score = data.maxScore ? parseInt(data.maxScore) : 500000;

          let difficultyId = data.difficulty;

          if (data.difficulty) {
            difficultyId = difficultyId.toString();
            if (difficultyId == "extreme") {
              difficultyId = 1;
            } else if (difficultyId == "hard") {
              difficultyId = 3;
            } else if (difficultyId == "normal") {
              difficultyId = 4;
            } else {
              difficultyId = parseInt(difficultyId);
            }
          } else {
            difficultyId = 1;
          }

          t.test();

          //apply custom if there is
          const config = this.readFileOnDevice(`${files[x]}/config.json`);

          if (config) {
            const keys = Object.keys(config);
            for (const key of keys) {
              //SongTemplate
              let subKeys = Object.keys(config[key]);
              for (const subKey of subKeys) {
                t._Song[subKey] = config[key][subKey];
                t._BeatmapVariantReference._Song[subKey] = config[key][subKey];
              }
            }
          }
          //end applying config

          t.changeDetails(
            data.title,
            data.artist,
            parseFloat(data.bpm),
            parseInt(data.sections),
            score,
            data.numLanes,
            data.type
          );

          //setup lang changes

          //end lang changes

          let template;
          try {
            template = t.build();
          } catch (e) {
            brokenSongs.push(data.title);
            return resolve();
          }

          //fix difficulty
          let variantReference = template.field("_BeatmapVariantReference")
            .value as Il2Cpp.Object;
          variantReference.field("_Difficulty").value =
            this.dataCache.getDifficultyById(difficultyId);

          moddedFiles.push({
            id: data.id,
            title: data.title,
            artist: data.artist,
            template: template,
          });
          resolve();
        })
      );
    }
    await Promise.all(promises);
    if (brokenSongs.length) {
      Device.toast(
        `${brokenSongs.length} broken song${
          brokenSongs.length === 1 ? "" : "s"
        } detected. See log for names.`
      );
      Logger.log("Broken songs: " + brokenSongs.join(", "));
    }
    return moddedFiles;
  }
  readFileOnDevice = (fileName: string): any => {
    const currentApplication = Java.use(
      "android.app.ActivityThread"
    ).currentApplication();
    const context = currentApplication.getApplicationContext();
    const BufferedReader = Java.use("java.io.BufferedReader");
    const FileReader = Java.use("java.io.FileReader");
    const StringBuilder = Java.use("java.lang.StringBuilder");
    const toast = Java.use("android.widget.Toast");

    let rootPath = context.getFilesDir();

    let fileReader, bufferedReader;

    try {
      fileReader = FileReader.$new(fileName);
      bufferedReader = BufferedReader.$new(fileReader);
      const sb = StringBuilder.$new();
      let line = bufferedReader.readLine();

      while (line != null) {
        sb.append(line);
        line = bufferedReader.readLine();
      }
      const built = sb.toString();
      return JSON.parse(built);
    } catch (e) {
      let message: string;
      if (fileName.includes(".zip")) {
        const zipPath = fileName.slice(0, fileName.indexOf(".zip") + 4);
        message = `You need to unzip your songs. ${zipPath} isn't a valid song.`;
      } else if (!fileName.includes("config.json")) {
        message = "Error reading " + fileName;
      } else {
        return {};
      }
      toast
        .makeText(
          Java.use("android.app.ActivityThread")
            .currentApplication()
            .getApplicationContext(),
          Java.use("java.lang.String").$new(message),
          1
        )
        .show();

      return {};
    } finally {
      if (bufferedReader) {
        bufferedReader.close();
      }
    }
  };
}
