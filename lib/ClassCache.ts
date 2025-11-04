import Logger from "./Logger";

class InternalClassCache {
  langConfig: any;
  unlockSongProcess: any;
  userBeatmaps: any;

  constructor() {
    const self = this;
    const lang = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
    const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;

    lang
      .class("com.spaceape.sharedlang.LangConfig")
      .method("Read").implementation = function (input) {
      Logger.log("Saved lang config instance.");
      this.method("Read").invoke(input);
      self.langConfig = this;
    };

    metalogic.class("UnlockSongProcess").method(".ctor").implementation =
      function () {
        Logger.log("Saved unlock song process instance.");
        this.method(".ctor").invoke();
        self.unlockSongProcess = this;
      };

    metalogic
      .class("com.spaceape.flamingo.model.UserBeatmaps")
      .method(".ctor").implementation = function (beatmaps) {
      Logger.log("Saved user beatmaps instance.");
      this.method(".ctor").invoke(beatmaps);
      self.userBeatmaps = this;
    };
  }
}

const ClassCache = new InternalClassCache();
export default ClassCache;
