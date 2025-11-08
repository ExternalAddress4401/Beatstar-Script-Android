/**
 * Writes extra fields to this request so we can get custom beatmap details
 */
export const hookScoring = () => {
  const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
  RakshaModel.class(
    "com.spaceape.flamingo.commands.RhythmGameEnded_SharplaAudit"
  ).method("WriteFields").implementation = function (output) {
    const template = this.method("get_song").invoke() as Il2Cpp.Object;
    const variant = template
      .method("get_BeatmapVariantReference")
      .invoke() as Il2Cpp.Object;
    const difficulty = variant.field("Difficulty_id").value;
    const isDeluxe =
      variant.field("BeatmapType").value.toString() === "Promode";

    output.method("Write").invoke(26, difficulty);
    output.method("Write").invoke(27, isDeluxe);

    this.method("WriteFields").invoke(output);
  };
};
