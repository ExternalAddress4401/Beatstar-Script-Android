type LocationInterface = "Local" | "Remote";

export default class Location {
  state: LocationInterface;

  constructor(state: LocationInterface) {
    this.state = state;
  }
  build() {
    const unity = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;
    return unity.class("com.spaceape.assets.BundleLocation").field(this.state)
      .value;
  }
}
