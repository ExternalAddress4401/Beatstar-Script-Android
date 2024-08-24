export const disableNews = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("BeatStar.News.LiveopsNewsFeedStoryInfo")
    .method("get_ShouldPopup").implementation = function () {
    return false;
  };
};
