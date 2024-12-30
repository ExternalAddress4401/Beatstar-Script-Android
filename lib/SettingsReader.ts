import Logger from "./Logger.js";
import fs from "frida-fs";

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Settings {
  gameIp: string;
  gamePort?: number;
  ip?: string;
  port?: number;
  graphics?: "low" | "med" | "high" | "high_120";
  delay?: number;
  loadScript?: string;
  aPlusColor?: Color;
  aColor?: Color;
  bColor?: Color;
  disableScoreSync?: string;
  loadLocalScript?: string;
  logErrors?: string;
  version?: string;
  fps?: number;
  forceLogin?: string;
  offline?: string;
  fakeVersion?: string;
}

class SettingsReader {
  settings: Settings | null = null;

  constructor() {
    try {
      if (Logger) {
        Logger.log("Reading settings file");
      }
      const settings = fs
        .readFileSync("sdcard/beatstar/settings.json")
        .toString();
      this.settings = JSON.parse(settings);
    } catch (e) {
      const error = e as Error;
      if (Logger) {
        Logger.log(`Error reading settings file: ${error.message}`);
      }
    }
  }

  getSetting(setting: keyof Settings) {
    if (!this.settings) {
      return null;
    }
    return this.settings[setting];
  }
}

export default new SettingsReader();
