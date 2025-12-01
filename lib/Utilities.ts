import http from "@frida/http";
import Logger from "../lib/Logger.js";
import fs from "frida-fs";
import Java from "frida-java-bridge";
import SettingsReader from "./SettingsReader.js";

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

export const customServerNetworkRequest = (
  path: string,
  body: any = {}
): Promise<string> => {
  return new Promise(function (resolve) {
    const host = SettingsReader.getSetting("serverIp");
    const port = SettingsReader.getSetting("serverExpressPort");

    const targetUrl = "http://" + host + ":" + port + path;

    body = JSON.stringify(body);

    Java.perform(function () {
      var HttpURLConnection = Java.use("java.net.HttpURLConnection");
      var URL = Java.use("java.net.URL");
      var BufferedReader = Java.use("java.io.BufferedReader");
      var BufferedWriter = Java.use("java.io.BufferedWriter");
      var BufferedOutputStream = Java.use("java.io.BufferedOutputStream");
      var OutputStreamWriter = Java.use("java.io.OutputStreamWriter");
      var StringBuilder = Java.use("java.lang.StringBuilder");
      var InputStreamReader = Java.use("java.io.InputStreamReader");

      var url = URL.$new(Java.use("java.lang.String").$new(targetUrl));
      var conn = url.openConnection();
      conn = Java.cast(conn, HttpURLConnection);
      conn.setRequestMethod("POST");
      conn.setRequestProperty("Content-Type", "application/json");
      conn.setConnectTimeout(5000);
      conn.setReadTimeout(5000);
      conn.setDoInput(true);
      conn.setDoOutput(true);
      conn.setChunkedStreamingMode(0);

      let os;
      try {
        os = conn.getOutputStream();
      } catch (e) {
        resolve("{}");
        return;
      }

      const out = BufferedOutputStream.$new(os);
      const osw = OutputStreamWriter.$new(
        out,
        Java.use("java.lang.String").$new("UTF-8")
      );
      var writer = BufferedWriter.$new(osw);
      writer.$super.write(Java.use("java.lang.String").$new(body));
      writer.flush();
      writer.close();
      os.close();

      conn.connect();
      var code = conn.getResponseCode();
      var ret: string | null = null;
      if (code == 200) {
        var inputStream = conn.getInputStream();
        var buffer = BufferedReader.$new(InputStreamReader.$new(inputStream));
        var sb = StringBuilder.$new();
        var line = null;
        while ((line = buffer.readLine()) != null) {
          sb.append(line);
        }
        ret = sb.toString();
      }
      conn.disconnect();
      resolve(ret as string);
    });
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
