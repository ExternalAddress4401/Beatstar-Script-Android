export function forcePlayableSongs() {
  const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;

  metalogic
    .class("CampaignSongsSystem")
    .method("IsUserPlayable").implementation = function (t) {
    return true;
  };
}
