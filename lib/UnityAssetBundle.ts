import Location from "./Location.js";

export default class UnityAssetBundle {
  id: string;
  Dependencies_id: any;
  _Dependencies: any;
  Location: Location;
  Hash: string;
  SizeInBytes: number;
  CRC: number;

  constructor(id: string) {
    this.id = id.toString();
    this.Location = new Location("Remote");
    this.Hash = "cc891c481b3c6e50e8506a717aa5746e";
    this.SizeInBytes = 0;
    this.CRC = 0;
  }
  build() {
    const unity = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;

    let bundle = unity.class("com.spaceape.assets.UnityAssetBundle").alloc();
    bundle.method(".ctor").invoke(root);

    bundle.field("id").value = Il2Cpp.string(this.id);
    bundle.field("Location").value = this.Location.build();
    bundle.field("Hash").value = Il2Cpp.string(this.Hash);
    bundle.field("SizeInBytes").value = this.SizeInBytes;
    bundle.field("CRC").value = this.CRC;

    return bundle;
  }
}
