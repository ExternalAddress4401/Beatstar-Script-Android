export const disableTutorial = () => {
  const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;

  const tutorialFlagIds = [1, 2, 3, 4, 16, 55, 87, 89];

  metalogic
    .class("com.spaceape.flamingo.model.UserFtueFlags")
    .method("IsFlagSet").implementation = function (flag: Il2Cpp.Object) {
    const id = flag.field("id").value;
    if (tutorialFlagIds.includes(id)) {
      return true;
    }
    return this.method("IsFlagSet").invoke(flag);
  };
};

//Nope!
//com.spaceape.config.GameConfig
//com.spaceape.config.RhythmTutorialTemplate[] RhythmTutorials;

//com.spaceape.config.VenueTemplate[] Venues; // 0x1d8
//raksha.ArrayByIdCacheT<System.UInt32> venuesById; // 0x1e0

//static com.spaceape.config.ProfileSwitchType CompletedTapFlickTutorial = 47;
//static com.spaceape.config.ProfileSwitchType CompletedTapTutorial = 48;
//static com.spaceape.config.ProfileSwitchType CompletedHoldTutorial = 49;
//static com.spaceape.config.ProfileSwitchType CompletedHoldFlickTutorial = 50;

//GameSetup
//System.Boolean get_HasRhythmTutorial(); // 0x02ea2338
