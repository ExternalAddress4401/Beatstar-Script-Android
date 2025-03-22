import Logger from "../lib/Logger";

/**
 * Fixes the length of custom songs so they play forever
 */
export const lengthFixer = () => {
  const coreModule = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
  const mscorlib = Il2Cpp.domain.assembly("mscorlib").image;
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  coreModule.class("UnityEngine.TextAsset").method("get_bytes").implementation =
    function () {
      let name = this.method("get_name").invoke() as Il2Cpp.String;
      let data = this.method("get_bytes").invoke() as Il2Cpp.Array;
      if (name.toString() == '"music_metadata"') {
        try {
          let strr = mscorlib
            .class("System.BitConverter")
            .method("ToString")
            .overload("System.Byte[]")
            .invoke(data) as Il2Cpp.String;

          strr = strr.object
            .method("Replace")
            .overload("System.String", "System.String")
            .invoke(Il2Cpp.string("-"), Il2Cpp.string("")) as Il2Cpp.String;

          let copy = strr.content;

          strr = strr.object
            .method("Replace")
            .overload("System.String", "System.String")
            .invoke(
              Il2Cpp.string("615555D547220041"),
              Il2Cpp.string("00000000882A7141")
            ) as Il2Cpp.String;

          strr = strr.object
            .method("Replace")
            .overload("System.String", "System.String")
            .invoke(
              Il2Cpp.string("565555D547220041"),
              Il2Cpp.string("00000000882A7141")
            ) as Il2Cpp.String;

          // for some reason the regex replaces can drop bytes off the end...
          if (strr.content.length !== copy.length) {
            strr.content =
              strr.content + copy.slice(strr.content.length, copy.length);
          }

          const result = assembly
            .class("BeatStar.AppsFlyer.AppsFlyerSetup")
            .method("StringToByteArray")
            .invoke(Il2Cpp.string(strr.content));

          return result;
        } catch (e) {
          const error = e as Error;
          Logger.log(`Got an error replacing: ${error.message}`);
          return data;
        }
      }
      return data;
    };
};
