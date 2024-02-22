type contentState = "Placeholder" | "Master";

export default class SongContentState {
  state: contentState;

  constructor(state: contentState) {
    this.state = state;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    return RakshaModel.class("com.spaceape.config.SongContentState").field(
      this.state
    ).value;
  }
}
