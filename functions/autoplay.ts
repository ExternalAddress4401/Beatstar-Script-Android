let enabled = false;

const autoplay = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
  const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;

  assembly
    .class("BeatStar.RhythmGame.GameController")
    .method("InteractionVisibleStart").implementation = function (
    interaction: Il2Cpp.Object
  ) {
    if (!enabled) {
      return this.method("InteractionVisibleStart").invoke(interaction);
    }
    const time = this.field("musicPlayerPlaybackTime").value as Il2Cpp.Object;
    const currentTime = time.field("musicPlaybackTimeSecs").value as number;

    const type = interaction.class.name;

    const back = interaction.ref(true);

    if (type == "TapInteraction") {
      const timeForPerfect = interaction.field("timeForPerfect")
        .value as number;
      const difference = (timeForPerfect - currentTime) as number;

      //don't try to set the initial two notes
      if (difference < 0) {
        return;
      }

      setTimeout(() => {
        const note = back.target;
        note?.method("HandleComplete").invoke(true, timeForPerfect);
        back.free();
      }, difference * 1000);
    } else if (type == "HoldInteraction") {
      const timeForPerfect = interaction.field("timeForStartPerfect")
        .value as number;
      const difference = (timeForPerfect - currentTime) as number;
      setTimeout(() => {
        const note = back.target;
        note
          ?.method("HandleTouchStarted")
          .invoke(timeForPerfect, timeForPerfect, 1);
        back.free();
      }, difference * 1000);
    } else if (type == "FlickInteraction") {
      const timeForPerfect = interaction.field("timeForPerfect")
        .value as number;
      const difference = (timeForPerfect - currentTime) as number;
      setTimeout(() => {
        const note = back.target;
        note?.method("HandleComplete").invoke(true, timeForPerfect);
        back.free();
      }, difference * 1000);
    } else if (type == "HoldFlickInteraction") {
      const info = assembly.class("DanceInput.TouchInput").alloc();
      info.method(".ctor").invoke(1);
      const timeForPerfect = interaction.field("timeForStartPerfect")
        .value as number;
      const flickPerfect = interaction.field("timeForFlickPerfect")
        .value as number;
      const difference = (timeForPerfect - currentTime) as number;
      const flickDifference = (flickPerfect - currentTime) as number;

      setTimeout(() => {
        interaction
          .method("HandleTouchStarted")
          .invoke(info, timeForPerfect, timeForPerfect);
      }, difference * 1000);
      setTimeout(() => {
        interaction.method("HandleFlickComplete").invoke(flickDifference);
      }, flickDifference * 1000);
    } else if (type == "SwitchHoldInteraction") {
      const timeForPerfect = interaction.field("timeForStartPerfect")
        .value as number;
      const difference = (timeForPerfect - currentTime) as number;
      setTimeout(() => {
        interaction
          .method("HandleTouchStarted")
          .invoke(
            timeForPerfect,
            timeForPerfect,
            1,
            RakshaModel.class("com.spaceape.config.ScoreType").field("APLUS")
              .value
          );
      }, difference * 1000);
    } else if (type == "SwitchHoldFlickInteraction") {
      const info = assembly.class("DanceInput.TouchInput").alloc();
      info.method(".ctor").invoke(1);
      const timeForPerfect = interaction.field("timeForStartPerfect")
        .value as number;
      const difference = (timeForPerfect - currentTime) as number;
      const flickPerfect = interaction.field("timeForFlickPerfect")
        .value as number;
      const flickDifference = (flickPerfect - currentTime) as number;

      setTimeout(() => {
        interaction
          .method("HandleTouchStarted")
          .invoke(
            info,
            timeForPerfect,
            timeForPerfect,
            RakshaModel.class("com.spaceape.config.ScoreType").field("APLUS")
              .value
          );
      }, difference * 1000);

      setTimeout(() => {
        interaction.method("HandleFlickComplete").invoke(flickDifference);
      }, flickDifference * 1000);
    }

    this.method("InteractionVisibleStart").invoke(interaction);
  };
};

const toggle = () => {
  enabled = !enabled;
};

const getStatus = () => {
  return enabled ? "Autoplay enabled" : "Autoplay disabled";
};

export { toggle, getStatus, autoplay };
