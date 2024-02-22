export function freeUnlimitedPlay() {
  const assembly = Il2Cpp.domain.assembly("RakshaModel").image;
  let cases = Il2Cpp.gc.choose(
    assembly.class("com.spaceape.flamingo.model.CampaignGachaBoxSlotsTO")
  )[0] as Il2Cpp.Object;
  let list = cases.field("slots").value as Il2Cpp.Object;
  list.method("Clear").invoke();
}
