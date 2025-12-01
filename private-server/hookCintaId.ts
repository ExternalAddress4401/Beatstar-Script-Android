import fs from "frida-fs";
import { setCinta } from "../lib/Globals";

/**
 * Reads a cinta ID from the user file to authenticate a user.
 */
export const hookCintaId = () => {
  const loginRuntime = Il2Cpp.domain.assembly("SpaceApe.Login.Runtime").image;

  loginRuntime.class("CintaProvider").method("get_Cinta").implementation =
    function () {
      const cinta = Il2Cpp.string(
        fs.readFileSync("sdcard/beatstar/user").toString()
      );
      setCinta(cinta.content);
      return cinta;
    };
};
