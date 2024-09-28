import { scores } from "../lib/Globals.js";
import { scoreToMedal } from "../lib/Utilities.js";
import { activateMod } from "../utilities/activateMod.js";

export const unlockAllSongs = () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
  const root = assembly.class("Config").field("Root").value as Il2Cpp.Object;

  assembly
    .class("OptionsDialog")
    .method("SettingsButtonPressed").implementation = function () {
    const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;

    activateMod();

    this.method("SettingsButtonPressed").invoke();

    let unlockSongProcess = Il2Cpp.gc.choose(
      metalogic.class("UnlockSongProcess")
    )[0];
    let userBeatmaps = Il2Cpp.gc.choose(
      metalogic.class("com.spaceape.flamingo.model.UserBeatmaps")
    )[0];

    let transaction = userBeatmaps
      .method("CreateTransaction")
      .invoke(
        RakshaModel.class(
          "com.spaceape.flamingo.model.BeatmapRewardSource"
        ).field("CardCase").value
      ) as Il2Cpp.Object;

    Il2Cpp.gc
      .choose(RakshaModel.class("com.spaceape.config.BeatmapTemplate"))
      .forEach((beatmap: Il2Cpp.Object) => {
        if (
          beatmap.field("BeatmapVariantReference_id").value.toString() != "null"
        ) {
          unlockSongProcess
            .method("Cmd_UnlockSong")
            .invoke(
              beatmap,
              RakshaModel.class(
                "com.spaceape.flamingo.model.BeatmapRewardSource"
              ).field("CardCase").value,
              transaction,
              transaction
            );
        }
      });
    const gradingSystem = Il2Cpp.gc.choose(metalogic.class("GradingSystem"))[0];

    const beatmaps = Il2Cpp.gc.choose(
      RakshaModel.class("com.spaceape.flamingo.model.BeatmapTO")
    );

    const gameConfig = gradingSystem.field("gameConfig").value as Il2Cpp.Object;

    const grades = gameConfig.field("Grades").value as Il2Cpp.Array;

    for (const instance of beatmaps) {
      let template = instance.field("_template").value as Il2Cpp.Object;
      if (template.toString() == "null") {
        continue;
      }
      for (const score of scores) {
        if (score.beatmapId == template.field("id").value) {
          try {
            const BeatmapScore = RakshaModel.class(
              "com.spaceape.config.BeatmapScore"
            ).alloc();
            BeatmapScore.method(".ctor").invoke(root);
            BeatmapScore.field("absoluteScore").value = score.score;

            instance.field("HighestScore").value = BeatmapScore;

            let variant = template.field("_BeatmapVariantReference")
              .value as Il2Cpp.Object;

            const difficultyId = (
              variant.method("get_Difficulty").invoke() as Il2Cpp.Object
            ).field("id").value;

            let medal = scoreToMedal(score.score, difficultyId as number);

            if (
              variant.field("BeatmapType").value.toString() == "Promode" &&
              medal.includes("medal")
            ) {
              medal = "deluxe_" + medal;
            }

            for (var i = 0; i < 11; i++) {
              const grade = grades.get(i) as Il2Cpp.Object;
              const idLabel = grade.field("idLabel").value;

              if (idLabel.toString().slice(1, -1) === medal) {
                instance.method("set_HighestGrade").invoke(grade);
                break;
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    }

    //set stars
    const newStarCount = gradingSystem
      .method("CalculateTotalStarsFromSongs")
      .invoke() as Il2Cpp.Object;
    let currencies = Il2Cpp.gc.choose(metalogic.class("UserCurrencies"))[0];
    let starDefinition = currencies
      .method("get_StarCurrencyDefinition")
      .invoke() as Il2Cpp.Object;
    currencies
      .method("Set")
      .overload("com.spaceape.config.CurrencyDefinition", "System.Int32")
      .invoke(starDefinition, newStarCount);
  };
};
