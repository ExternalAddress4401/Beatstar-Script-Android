export default class DataCache {
  rakshaModel: any;
  difficulties: any[];

  constructor(rakshaModel: Il2Cpp.Image) {
    this.rakshaModel = rakshaModel;
    this.difficulties = Il2Cpp.gc.choose(
      this.rakshaModel.class("com.spaceape.config.SongDifficulty")
    );
  }

  getDifficultyById(id: any) {
    for (var x = 0; x < this.difficulties.length; x++) {
      let difficulty = this.difficulties[x] as Il2Cpp.Object;
      if (difficulty.field("id").value == id) {
        return difficulty;
      }
    }
  }
}
