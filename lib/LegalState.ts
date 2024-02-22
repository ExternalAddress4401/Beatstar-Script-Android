type legalState = "Development" | "Approved" | "Internal";

export default class LegalState {
  state: legalState;

  constructor(state: legalState) {
    this.state = state;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    return RakshaModel.class("com.spaceape.config.LegalState").field(this.state)
      .value;
  }
}
