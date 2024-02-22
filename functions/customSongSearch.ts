import { customSongs } from "../lib/Globals.js";

export const customsongsearch = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("ClientSongListSearch")
    .method("FindBeatmapsContainingText").implementation = function (
    searchTerm: any
  ) {
    const term = searchTerm.toString().slice(1, -1);
    const maps = this.method("FindBeatmapsContainingText").invoke(
      searchTerm
    ) as Il2Cpp.Object;
    for (const custom of customSongs) {
      if (custom.title.toLowerCase().includes(term)) {
        maps.method("Add").invoke(custom.template);
      }
    }
    return maps;
  };
};
