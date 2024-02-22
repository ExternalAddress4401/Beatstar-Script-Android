export default class AnimationCurveTO {
  preWrapMode: number;
  postWrapMode: number;
  keyFrames: AnimationCurveKeyFrameTO[] = [];

  constructor(
    preWrapMode: number,
    postWrapMode: number,
    frames: AnimationCurveKeyFrameTO[]
  ) {
    this.preWrapMode = preWrapMode;
    this.postWrapMode = postWrapMode;
    for (var x = 0; x < frames.length; x++) {
      let frame = frames[x];
      let keyFrame = new AnimationCurveKeyFrameTO(
        frame.value,
        frame.inTangent,
        frame.outTangent,
        frame.tangentMode,
        frame.time
      );
      this.keyFrames.push(keyFrame);
    }
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

    const root = assembly.class("Config").field("Root").value as Il2Cpp.Object;

    let animation = RakshaModel.class(
      "com.spaceape.config.AnimationCurveTO"
    ).alloc();
    animation.method(".ctor").invoke(root);

    animation.field("preWrapMode").value = this.preWrapMode;
    animation.field("postWrapMode").value = this.postWrapMode;
    animation.field("keyFrames").value = Il2Cpp.array(
      RakshaModel.class("com.spaceape.config.AnimationCurveKeyFrameTO"),
      this.keyFrames.map((el) => el.build())
    );

    return animation;
  }
}

class AnimationCurveKeyFrameTO {
  value: number;
  inTangent: number;
  outTangent: number;
  tangentMode: number;
  time: number;

  constructor(
    value: number,
    inTangent: number,
    outTangent: number,
    tangentMode: number,
    time: number
  ) {
    this.value = value;
    this.inTangent = inTangent;
    this.outTangent = outTangent;
    this.tangentMode = tangentMode;
    this.time = time;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

    const root = assembly.class("Config").field("Root").value as Il2Cpp.Object;

    let keyFrame = RakshaModel.class(
      "com.spaceape.config.AnimationCurveKeyFrameTO"
    ).alloc();
    keyFrame.method(".ctor").invoke(root);

    keyFrame.field("value").value = this.value;
    keyFrame.field("inTangent").value = this.inTangent;
    keyFrame.field("outTangent").value = this.outTangent;
    keyFrame.field("tangentMode").value = this.tangentMode;
    keyFrame.field("time").value = this.time;

    return keyFrame;
  }
}
