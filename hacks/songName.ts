import Translation from "../lib/Translation.js";

export function songNameHack() {
  const assembly = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
  //Handles arbitrary song and artist names. Also kills the error screen messages but no big deal
  assembly
    .class("com.spaceape.sharedlang.LangConfig")
    .method("GetTranslationById").implementation = function (id: any) {
    let res = this.method("GetTranslationById").invoke(id) as Il2Cpp.Object;
    if (res.toString() == "null") {
      let name = id.toString();
      name = name.substring(1, name.length - 1);
      let translation = new Translation(name, name);
      return translation.build();
    }
    return res;
  };
}
