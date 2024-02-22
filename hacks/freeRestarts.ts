export function freeRestarts() {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("RhythmGameContinueScreen")
    .method("SetCostToContinue").implementation = function (
    currency: Il2Cpp.Object
  ) {
    currency.field("amount").value = 0;
    this.method("SetCostToContinue").invoke(currency);
  };
}
