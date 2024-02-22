export default class SongTag {
  id: number;
  idLabel: string;

  constructor() {}
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;

    let songTag = RakshaModel.class("com.spaceape.config.SongTag").alloc();
    songTag.method(".ctor").invoke(root);

    songTag.field("id").value = this.id;
    songTag.field("idLabel").value = Il2Cpp.string(this.idLabel);

    return songTag;
  }
  test() {
    this.id = 12;
    this.idLabel = "rock";
  }
}
