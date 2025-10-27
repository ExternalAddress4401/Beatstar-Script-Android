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
