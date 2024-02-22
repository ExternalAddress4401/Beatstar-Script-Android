import UnityAssetBundle from "./UnityAssetBundle.js";

export default class UnityAsset {
  id: string;
  name: string;
  bundle_id: string;
  _bundle: any;

  constructor(id: string, name: string, bundle_id: string) {
    this.id = id;
    this.name = name;
    this.bundle_id = bundle_id;
    this._bundle = null;
  }
  build() {
    const unity = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;
    let asset = unity.class("com.spaceape.assets.UnityAsset").alloc();
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;
    asset.method(".ctor").invoke(root);

    asset.field("id").value = Il2Cpp.string(this.id);
    asset.field("name").value = Il2Cpp.string(this.name);
    asset.field("bundle_id").value = Il2Cpp.string(this.bundle_id);
    asset.field("_bundle").value = new UnityAssetBundle(this.bundle_id).build();

    return asset;
  }
}
