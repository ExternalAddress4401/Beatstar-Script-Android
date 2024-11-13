import CustomSongReader from "../lib/CustomSongReader.js";
import DataCache from "../lib/DataCache.js";
import {
  customSongs,
  setDataCache,
  setCustomSongs,
  dataCache,
  scores,
} from "../lib/Globals.js";
import { activateMod } from "../utilities/activateMod.js";
import { songNameHack } from "./songName.js";
import { hookOnDeviceBundles } from "../customs/hookOnDeviceBundles.js";
import { ignoreBundleHash } from "../customs/ignoreBundleHash.js";
import { hookRemoteBundles } from "../customs/hookRemoteBundles.js";
import Translation from "../lib/Translation.js";
import { scoreToMedal } from "../lib/Utilities.js";

export const unlockCustomSongs = async () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("OptionsDialog")
    .method("SupportButtonPressed").implementation = async function () {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const lang = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
    const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;

    activateMod();

    setDataCache(new DataCache(RakshaModel));

    songNameHack();
    hookOnDeviceBundles();
    ignoreBundleHash();
    hookRemoteBundles();

    //get the lang config to set the translations later
    const translations = Il2Cpp.gc.choose(
      lang.class("com.spaceape.sharedlang.LangConfig")
    )[0];

    const tr = translations.field("translations").value as Il2Cpp.Array;
    const locale = (
      (
        (tr.get(0) as Il2Cpp.Object).field("translations").value as Il2Cpp.Array
      ).get(0) as Il2Cpp.Object
    )
      .field("key")
      .value.toString()
      .slice(1, -1);

    //read custom songs
    let reader = new CustomSongReader(dataCache);
    setCustomSongs(await reader.readCustomSongsOnDevice());

    //each song has a name and artist we need to add
    const newLength = tr.length + customSongs.length * 2;

    //create a new array with the new size and copy the old values into the new
    const newTranslations = Il2Cpp.array(
      lang.class("com.spaceape.sharedlang.Translation"),
      newLength
    ) as Il2Cpp.Array;
    for (var i = 0; i < tr.length; i++) {
      newTranslations.set(i, tr.get(i));
    }

    //simplify the process with an index for where to add new values
    let index = tr.length;

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

    const promises: Promise<void>[] = [];

    for (var x = 0; x < customSongs.length; x++) {
      promises.push(
        new Promise((resolve, reject) => {
          unlockSongProcess
            .method("Cmd_UnlockSong")
            .invoke(
              customSongs[x].template,
              RakshaModel.class(
                "com.spaceape.flamingo.model.BeatmapRewardSource"
              ).field("CardCase").value,
              transaction,
              transaction
            );

          //create the new translations
          const nameTranslation = new Translation(
            customSongs[x].template
              .field("_Song")
              .value.field("SongTitleLoc_id")
              .value.toString()
              .slice(1, -1),
            customSongs[x].title,
            locale
          );

          const artistTranslation = new Translation(
            customSongs[x].template
              .field("_Song")
              .value.field("SongArtistLoc_id")
              .value.toString()
              .slice(1, -1),
            customSongs[x].artist,
            locale
          );

          //add them in
          newTranslations.set(index++, nameTranslation.build());
          newTranslations.set(index++, artistTranslation.build());
          resolve();
        })
      );
    }

    await Promise.all(promises);

    //set the new translations
    translations.field("translations").value = newTranslations;

    applyCustomSongScores();
  };
};

const applyCustomSongScores = () => {
  const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
  const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;
  const root = assembly.class("Config").field("Root").value as Il2Cpp.Object;

  const gradingSystem = Il2Cpp.gc.choose(metalogic.class("GradingSystem"))[0];
  const gameConfig = gradingSystem.field("gameConfig").value as Il2Cpp.Object;

  const grades = gameConfig.field("Grades").value as Il2Cpp.Array;

  const beatmaps = Il2Cpp.gc
    .choose(RakshaModel.class("com.spaceape.flamingo.model.BeatmapTO"))
    .filter(function (beatmap) {
      const template = beatmap.field("_template").value as Il2Cpp.Object;
      if (template.toString() == "null") {
        return false;
      }
      const idLabel = template.field("idLabel").value;
      return idLabel.toString().includes("file://");
    });

  for (const score of scores) {
    const beatmap = beatmaps.find((beatmap) => {
      const template = beatmap.field("_template").value as Il2Cpp.Object;
      if (template.field("id").value === score.beatmapId) {
        return true;
      }
    }) as Il2Cpp.Object;
    if (!beatmap) {
      continue;
    }
    console.log(beatmap);
    const BeatmapScore = RakshaModel.class(
      "com.spaceape.config.BeatmapScore"
    ).alloc();
    BeatmapScore.method(".ctor").invoke(root);
    BeatmapScore.field("absoluteScore").value = score.score;

    beatmap.field("HighestScore").value = BeatmapScore;

    let variant = beatmap.field("_BeatmapVariantReference")
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
        beatmap.method("set_HighestGrade").invoke(grade);
        break;
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

  /*for (const instance of beatmaps) {
    //check for existing score
    let template = instance.field("_template").value as Il2Cpp.Object;
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
  }*/
};
