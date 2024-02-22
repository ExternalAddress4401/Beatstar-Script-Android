export type BeatmapTypeEnum = "Regular" | "ProMode";

export default class BeatmapType {
  type: BeatmapTypeEnum;

  constructor(type: BeatmapTypeEnum) {
    this.type = type;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    return RakshaModel.class("com.spaceape.config.BeatmapVariantType").field(
      this.type
    ).value;
  }
}
