/**
 * Makes the game think our custom songs are on the device so it doesn't
 * try to download them
 */
export const hookOnDeviceBundles = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
  const assets = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;

  assembly
    .class("BeatStar.GameAssets.AppAssetBundleQueue")
    .method("IsAssetBundleOnDevice").implementation = function (
    unityAssetBundle: any
  ) {
    if (unityAssetBundle.field("SizeInBytes").value == 0) {
      return true;
    }
    return this.method("IsAssetBundleOnDevice").invoke(unityAssetBundle);
  };

  assets
    .class("com.spaceape.assetstreaming.AssetBundleManager")
    .method("HasAssetBundleBeenDownloaded").implementation = function (
    bundle,
    includeDependencies
  ) {
    if (bundle.field("SizeInBytes").value == 0) {
      return true;
    }
    return this.method("HasAssetBundleBeenDownloaded").invoke(
      bundle,
      includeDependencies
    );
  };
};
