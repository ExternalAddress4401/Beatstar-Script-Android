export default class WwiseSwitch {
  switchId: number;
  switchState: number;

  constructor(switchId: number, switchState: number) {
    this.switchId = switchId;
    this.switchState = switchState;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;
    let template = RakshaModel.class(
      "com.spaceape.apeaudio.WwiseSwitch"
    ).alloc();
    template.method(".ctor").invoke(root);

    template.field("switchId").value = this.switchId;
    template.field("switchState").value = this.switchState;

    return template;
  }
}
