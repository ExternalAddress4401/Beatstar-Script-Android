import http from "http";
import fs from "frida-fs";
import Logger from "../lib/Logger";

export const startAssetServer = () => {
  const server = http.createServer((req, res) => {
    const path = `sdcard/beatstar/assets/`;

    Logger.log("Got assets request: " + req.url);

    if (req.url.startsWith("/5")) {
      Logger.log("Path matches /5");
      const cacheFolder = req.url.split("/")[3].split(".")[0];

      const innerFolder = fs.readdirSync(
        `sdcard/beatstar/assets/UnityCache/Shared/${cacheFolder}`,
      );

      const file = fs.readFileSync(
        `sdcard/beatstar/assets/UnityCache/Shared/${cacheFolder}/${innerFolder}/__data`,
      );

      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
      });

      res.end(file);
    } else if (req.url.startsWith("/emoji")) {
      Logger.log("Path matches /emoji");
      const bundle = req.url.split("/")[2];
      const emojiPath = path.slice(0) + `streamableemojis/${bundle}`;

      const file = fs.readFileSync(emojiPath);

      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
      });

      res.end(file);
    } else {
      Logger.log("Default path");
      const bundle = req.url.split("/")[2];
      const iconPath = path.slice(0) + `streamedimages/${bundle}`;

      const file = fs.readFileSync(iconPath);

      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
      });

      res.end(file);
    }
  });

  server.listen(3570, "127.0.0.1", () => {
    Logger.log("Assets server running on localhost");
  });
};
