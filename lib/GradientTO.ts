enum GradientMode {
  Blend,
  Fixed,
}

export default class GradientTO {
  Mode: GradientMode;
  AlphaKeys: GradientAlphaKey[] = [];
  ColorKeys: GradientColorKey[] = [];

  constructor(gradients: any) {
    this.Mode = GradientMode.Blend;

    for (var x = 0; x < 2; x++) {
      let alphaKey = new GradientAlphaKey(1, x * 1);
      this.AlphaKeys.push(alphaKey);
    }

    for (var x = 0; x < gradients.length; x++) {
      let gradient = gradients[x];
      let colorKey = new GradientColorKey(gradient.color, gradient.time);
      this.ColorKeys.push(colorKey);
    }
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;

    let gradient = RakshaModel.class("com.spaceape.config.GradientTO").alloc();
    gradient.method(".ctor").invoke(root);

    gradient.field("AlphaKeys").value = Il2Cpp.array(
      RakshaModel.class("com.spaceape.config.GradientAlphaKeyTO"),
      this.AlphaKeys.map((el) => el.build())
    );
    gradient.field("ColorKeys").value = Il2Cpp.array(
      RakshaModel.class("com.spaceape.config.GradientColorKeyTO"),
      this.ColorKeys.map((el) => el.build())
    );

    return gradient;
  }
}

class GradientAlphaKey {
  Alpha: number;
  Time: number;

  constructor(alpha: number, time: number) {
    this.Alpha = alpha;
    this.Time = time;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;

    let alphaKey = RakshaModel.class(
      "com.spaceape.config.GradientAlphaKeyTO"
    ).alloc();
    alphaKey.method(".ctor").invoke(root);

    alphaKey.field("Alpha").value = this.Alpha;
    alphaKey.field("Time").value = this.Time;

    return alphaKey;
  }
}

class GradientColorKey {
  Color: string;
  Time: number;

  constructor(color: string, time: number) {
    this.Color = color;
    this.Time = time;
  }

  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;

    let gradientKey = RakshaModel.class(
      "com.spaceape.config.GradientColorKeyTO"
    ).alloc();
    gradientKey.method(".ctor").invoke(root);

    gradientKey.field("Color").value = Il2Cpp.string(this.Color);
    gradientKey.field("Time").value = this.Time;

    return gradientKey;
  }
}
