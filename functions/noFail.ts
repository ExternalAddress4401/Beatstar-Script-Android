let enabled = false;

const noFail = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("RhythmGame.GameBehaviours.GameBehaviourController")
    .method("SetupGameBehaviours").implementation = function () {
    this.method("SetupGameBehaviours").invoke();

    if (enabled) {
      const behaviours = this.field("gameBehaviourOptions")
        .value as Il2Cpp.Object;

      behaviours.field("BlockAndStop").value = false;
      behaviours.field("FailOnMiss").value = false;
      behaviours.field("RewindOnMiss").value = false;
      behaviours.field("FailOnWrongTap").value = false;
    }
  };
};

const toggle = () => {
  enabled = !enabled;
};

const getStatus = () => {
  return enabled ? "No fail enabled" : "No fail disabled";
};

export { toggle, getStatus, noFail };
