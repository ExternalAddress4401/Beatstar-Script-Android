export default class SongMetaTemplate {
  id: number;
  idLabel: string;

  constructor(id: number, idLabel: string) {
    this.id = id;
    this.idLabel = idLabel;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;

    let meta = RakshaModel.class(
      "com.spaceape.config.SongMetaTemplate"
    ).alloc();

    meta.method(".ctor").invoke(root);
    meta.field("id").value = this.id;
    meta.field("idLabel").value = Il2Cpp.string(this.idLabel);

    return meta;
  }
}
