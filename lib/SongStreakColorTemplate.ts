export default class SongStreakColorTemplate {
  GlowColor: string;
  PerfectBarColor: string;
  InvertPerfectBar: boolean;
  VFXColor: string;

  constructor(
    glowColor: string,
    perfectBarColor: string,
    invertPerfectBar: boolean,
    vfxColor: string
  ) {
    this.GlowColor = glowColor;
    this.PerfectBarColor = perfectBarColor;
    this.InvertPerfectBar = invertPerfectBar;
    this.VFXColor = vfxColor;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;

    let obj = RakshaModel.class(
      "com.spaceape.config.SongStreakColorTemplate"
    ).alloc();
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;
    obj.method(".ctor").invoke(root);

    obj.field("GlowColor").value = Il2Cpp.string(this.GlowColor);
    obj.field("PerfectBarColor").value = Il2Cpp.string(this.PerfectBarColor);
    obj.field("InvertPerfectBar").value = this.InvertPerfectBar;
    obj.field("VFXColor").value = Il2Cpp.string(this.VFXColor);

    return obj;
  }
}
