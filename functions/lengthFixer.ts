import Logger from "../lib/Logger";
import fs from "frida-fs";

const cm = new CModule(`
#include <gum/guminterceptor.h>
#include <stdlib.h>
#include <stdio.h>
#include <stdint.h>
#include <string.h>


uint8_t* datahex(char* arr) {
    size_t slength = strlen(arr);

    for(int i = 0; i < slength; i++) {
      if(arr[i] == 97 && arr[i+1] == 85 && arr[i+2] == 85 && arr[i+3] == 213 && arr[i+4] == 71 && arr[i+5] == 34 && arr[i+6] == 0 && arr[i+7] == 65) {
        arr[i] = 0;
        arr[i+1] = 0;
        arr[i+2] = 0;
        arr[i+3] = 0;
        arr[i+4] = 136;
        arr[i+5] = 42;
        arr[i+6] = 113;
        arr[i+7] = 65;
      }
    }

    return arr;
}`);

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

          strr = strr.object
            .method("Replace")
            .overload("System.String", "System.String")
            .invoke(
              Il2Cpp.string("615555D547220041"),
              Il2Cpp.string("00000000882A7141")
            ) as Il2Cpp.String;

          Logger.log("Replaced first");

          strr = strr.object
            .method("Replace")
            .overload("System.String", "System.String")
            .invoke(
              Il2Cpp.string("565555D547220041"),
              Il2Cpp.string("00000000882A7141")
            ) as Il2Cpp.String;

          const first = strr.content.slice(0, strr.content.length);

          const result = assembly
            .class("BeatStar.AppsFlyer.AppsFlyerSetup")
            .method("StringToByteArray")
            .invoke(Il2Cpp.string(first));

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
