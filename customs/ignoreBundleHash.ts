/**
 * Kills the hashing code so all our bundles are considered valid
 */
export const ignoreBundleHash = () => {
  const assembly = Il2Cpp.domain.assembly(
    "UnityEngine.UnityWebRequestAssetBundleModule"
  ).image;

  assembly
    .class("UnityEngine.Networking.UnityWebRequestAssetBundle")
    .method("GetAssetBundle")
    .overload(
      "System.String",
      "UnityEngine.Hash128",
      "System.UInt32"
    ).implementation = function (uri: any /*there were 2 parameters here*/) {
    let res = this.method("GetAssetBundle")
      .overload("System.String")
      .invoke(uri);
    return res;
  };
};
