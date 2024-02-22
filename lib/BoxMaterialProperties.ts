export default class BoxMaterialProperties {
  Tints: GachaBoxMaterialTints;
  Decal: GachaBoxMaterialDecalProperties;
  SurfaceProperties: any;

  constructor(
    tint1: string,
    tint2: string,
    texture_id: string,
    _texture: any,
    textureTint: string
  ) {
    this.Tints = new GachaBoxMaterialTints(tint1, tint2);
    this.Decal = new GachaBoxMaterialDecalProperties(
      texture_id,
      _texture,
      textureTint
    );
    this.SurfaceProperties = null;
  }
  build() {
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;

    let properties = RakshaModel.class(
      "com.spaceape.config.GachaBoxMaterialProperties"
    ).alloc();
    properties.method(".ctor").invoke(root);

    properties.field("Tints").value = this.Tints.build();
    properties.field("Decal").value = this.Decal.build();

    return properties;
  }
}

class GachaBoxMaterialTints {
  tint1: string;
  tint2: string;

  constructor(tint1: string, tint2: string) {
    this.tint1 = tint1;
    this.tint2 = tint2;
  }
  build() {
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;

    let tints = RakshaModel.class(
      "com.spaceape.config.GachaBoxMaterialTints"
    ).alloc();
    tints.method(".ctor").invoke(root);

    tints.field("tint1").value = Il2Cpp.string(this.tint1);
    tints.field("tint2").value = Il2Cpp.string(this.tint2);

    return tints;
  }
}

class GachaBoxMaterialDecalProperties {
  texture_id: string;
  _texture: any;
  textureTint: string;

  constructor(texture_id: string, _texture: any, textureTint: string) {
    this.texture_id = texture_id;
    this._texture = _texture;
    this.textureTint = textureTint;
  }
  build() {
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;

    let decal = RakshaModel.class(
      "com.spaceape.config.GachaBoxMaterialDecalProperties"
    ).alloc();
    decal.method(".ctor").invoke(root);

    decal.field("texture_id").value = Il2Cpp.string(this.texture_id);
    //decal.field('_texture').value = null;
    decal.field("textureTint").value = Il2Cpp.string(this.textureTint);

    return decal;
  }
}
