//@ts-nocheck

export default class SongDifficulty {
  id: number;
  difficulty: number;
  idLabel: string;

  constructor() {}
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;

    let difficulty = RakshaModel.class(
      "com.spaceape.config.SongDifficulty"
    ).alloc();
    difficulty.method(".ctor").invoke(root);

    difficulty.field("id").value = this.id;
    difficulty.field("difficulty").value = this.difficulty;
    difficulty.field("idLabel").value = Il2Cpp.string(this.idLabel);
    return difficulty;
  }
  test() {
    this.id = 3;
    this.difficulty = 10;
    this.idLabel = "normal";
  }
}
