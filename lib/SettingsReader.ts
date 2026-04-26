import Logger from "./Logger.js";
import fs from "frida-fs";

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Settings {
  serverIp: string;
  serverPort: number;
  serverExpressPort: number;
  graphics?: "low" | "med" | "high" | "high_120";
  loadScript?: string;
  aPlusColor?: Color;
  aColor?: Color;
  bColor?: Color;
  logErrors?: string;
  fps?: number;
  offline?: string;
  fakeVersion?: string;
}

class SettingsReader {
  settings: Settings = {
    serverIp: "",
    serverPort: 0,
    serverExpressPort: 0,
  };

  constructor() {
    try {
      Logger.log("Reading settings file");
      const settings = fs
        .readFileSync("sdcard/beatstar/settings.json")
        .toString();
      this.settings = JSON.parse(settings);
    } catch (e) {
      // if it doesn't exist make it
      try {
        fs.statSync("sdcard/beatstar/settings.json");
      } catch (e) {
        fs.writeFileSync("sdcard/beatstar/settings.json", "{}");
      }
    }
    this.setDefaults();
  }
  setDefaults() {
    if (this.settings.serverIp === undefined) {
      this.settings.serverIp = "beatstarmod.app";
    }
    if (this.settings.serverPort === undefined) {
      this.settings.serverPort = 3000;
    }
    if (this.settings.serverExpressPort === undefined) {
      this.settings.serverExpressPort = 4000;
    }
  }

  getSetting<K extends keyof Settings>(setting: K): Settings[K] {
    return this.settings?.[setting];
  }
}

export default new SettingsReader();
