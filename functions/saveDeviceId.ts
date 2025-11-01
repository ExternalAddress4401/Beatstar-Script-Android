import fs from "frida-fs";
import Device from "../lib/Device";

export const saveDeviceId = () => {
  const id = Device.getAndroidId();
  fs.writeFileSync("sdcard/beatstar/uuid.txt", id);
};
