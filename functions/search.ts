import * as nofail from "./noFail.js";
import * as autoplay from "./autoplay.js";

import Java from "frida-java-bridge";
import Device from "../lib/Device.js";
import { writeFileToDevice } from "../lib/Utilities.js";
import SettingsReader from "../lib/SettingsReader.js";
import { unlockAllSongs } from "../utilities/unlockAllSongs.js";

export const search = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("SongCollection_SearchElement")
    .method("UpdateInputFilledState").implementation = function () {
    console.log(SettingsReader.getSetting("alternateUnlock"));
    const input = this.field("inputField").value as Il2Cpp.Object;
    const text = input.field("m_Text").value as Il2Cpp.String;
    const searchTerm = text.toString().slice(1, -1);

    if (searchTerm == "nofail") {
      nofail.toggle();
      Device.toast(nofail.getStatus());
    } else if (searchTerm == "autoplay") {
      autoplay.toggle();
      Device.toast(autoplay.getStatus());
    } else if (searchTerm == "link") {
      Device.toast(Device.getAndroidId());
    } else if (
      searchTerm == "unlock" &&
      SettingsReader.getSetting("alternateUnlock") === "true"
    ) {
      unlockAllSongs();
    } /*else if (searchTerm.endsWith("link")) {
      const username = searchTerm.split(" ").slice(0, -1).join(" ");
      if (username.trim().length === 0) {
        return;
      }

      deviceNetworkRequest("/link", {
        androidId: Device.getAndroidId(),
        username,
        key: encryptAndroidId(),
      }).then(function (response) {
        const success = JSON.parse(response).success;
        Device.toast(
          success ? "Set your username." : "Failed to set username."
        );
      });
    }*/ else if (searchTerm == "dump") {
      Device.toast("Starting dump...");

      const file = Java.use("java.io.File");
      file.$new("sdcard/beatstar/protos").mkdirs();

      const klasses: Il2Cpp.Class[] = [];

      for (const assembly of Il2Cpp.domain.assemblies) {
        for (const klass of assembly.image.classes) {
          if (klass.parent?.name === "RakshaDatabase") {
            klasses.push(klass);
          }
        }
      }

      for (const klass of klasses) {
        const json = Il2Cpp.domain.assembly("JsonFx.Json").image;
        const rakshaClient = Il2Cpp.domain.assembly("raksha-client").image;
        const gc = Il2Cpp.gc.choose(klass)[0];

        const o = json.class("JsonFx.Json.JsonWriterSettings").alloc();
        o.method(".ctor").invoke();

        if (gc) {
          const str = rakshaClient
            .class("raksha.RakshaJson")
            .method("Serialize")
            .invoke(gc, o) as Il2Cpp.String;

          writeFileToDevice(`protos/${klass.name}.json`, str.toString());
        }
      }
      Device.toast("Finished dumping.");
    }
  };
};
