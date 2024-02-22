export const unlockAllSkins = () => {
  const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;
  const rakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;

  const userSkins = Il2Cpp.gc.choose(
    metalogic.class("com.spaceape.flamingo.model.UserTrackSkins")
  )[0];
  const skins = Il2Cpp.gc.choose(
    rakshaModel.class(
      "com.spaceape.liveopstrackskinconfig.LiveOpsTrackSkinTemplate"
    )
  );

  for (const skin of skins) {
    userSkins.method("Cmd_AddUnlockedTrackSkin").invoke(skin);
  }
};
