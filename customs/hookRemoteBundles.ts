import { customSongs } from "../lib/Globals.js";

export const hookRemoteBundles = () => {
  const assembly = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;

  assembly
    .class("com.spaceape.assetstreaming.AssetBundleDownloader")
    .method("DownloadRemoteBundle").implementation = function (
    bundle: any,
    url: Il2Cpp.String,
    onComplete: any
  ) {
    for (var x = 0; x < customSongs.length; x++) {
      let str = url.toString();
      let path = str
        .substring(str.indexOf("file"), str.indexOf(".bundle") + 7)
        .replace(/\s+/g, "_");
      if (
        str.includes("audio.bundle") ||
        str.includes("artwork.bundle") ||
        str.includes("chart.bundle")
      ) {
        url = Il2Cpp.string(path);
      }
    }
    return this.method("DownloadRemoteBundle").invoke(bundle, url, onComplete);
  };
};
