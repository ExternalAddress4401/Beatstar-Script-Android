export const stopPauseHandler = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
  assembly
    .class("AppPauseResumeRestartDetection")
    .method("OnApplicationPause").implementation = function (
    isPaused: boolean,
  ) {
    return;
  };
};
