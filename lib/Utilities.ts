import SettingsReader from "./SettingsReader.js";
import http from "@frida/http";
import Logger from "../lib/Logger.js";
import fs from "frida-fs";
import { offline } from "./Globals.js";
import Java from "frida-java-bridge";

export const readFileOnDevice = (
  fileName: string,
  root: boolean = false
): any => {
  if (root) {
    const currentApplication = Java.use(
      "android.app.ActivityThread"
    ).currentApplication();
    const context = currentApplication.getApplicationContext();
    let rootPath = context.getFilesDir();

    return fs.readFileSync(`${rootPath}/${fileName}`).toString();
  } else {
    return fs.readFileSync(`sdcard/beatstar/${fileName}`).toString();
  }
};

export const writeFileToDevice = (fileName: string, data: string) => {
  try {
    const PrintWriter = Java.use("java.io.PrintWriter");

    const writer = PrintWriter.$new(`sdcard/beatstar/${fileName}`);
    writer.print(data);
    writer.close();
  } catch (e) {
    Logger.log("Failed to write file to device: " + e);
  }
};

export const networkRequest = (path: string, data: object = {}): any => {
  const options = {
    hostname: "143.110.226.4",
    port: 5000,
    path: path,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      data: JSON.stringify(data),
    },
  };

  let result = "";

  return new Promise(function (resolve) {
    try {
      const req = http.request(options, (res: any) => {
        res.on("data", (d: any) => {
          result += d;
        });

        res.on("end", (d: any) => {
          resolve(result);
        });
      });

      req.on("error", (error: Buffer) => {
        Logger.log(error.toString());
        resolve(null);
      });

      req.write(JSON.stringify(data));
      req.end();
    } catch (e) {}
  });
};

export const scoreToMedal = (score: number, difficulty: number) => {
  const normal = {
    star_1: 0,
    star_2: 10000,
    star_3: 17500,
    star_4: 35000,
    star_5: 47500,
    medal_gold: 48500,
    medal_platinum: 49000,
    medal_diamond: 49500,
  };
  const hard = {
    star_1: 0,
    star_2: 15000,
    star_3: 37500,
    star_4: 60000,
    star_5: 71250,
    medal_gold: 72750,
    medal_platinum: 73500,
    medal_diamond: 74250,
  };
  const extreme = {
    star_1: 0,
    star_2: 20000,
    star_3: 50000,
    star_4: 80000,
    star_5: 95000,
    medal_gold: 97000,
    medal_platinum: 98000,
    medal_diamond: 99000,
  };
  switch (difficulty) {
    case 1:
      return Object.entries(extreme)
        .reverse()
        .find((el) => el[1] <= score)![0];
    case 3:
      return Object.entries(hard)
        .reverse()
        .find((el) => el[1] <= score)![0];
    default:
      return Object.entries(normal)
        .reverse()
        .find((el) => el[1] <= score)![0];
  }
};

export const createDirectories = () => {
  const file = Java.use("java.io.File");

  try {
    file.$new("sdcard/beatstar").mkdirs();
    file.$new("sdcard/beatstar/songs").mkdirs();
    file.$new("sdcard/beatstar/script").mkdirs();
  } catch (e) {
    const error = e as Error;
    Logger.log(`Error creating directories: ${error.message}`);
  }
};

export const getJavaVersion = () => parseInt(Java.androidVersion);
