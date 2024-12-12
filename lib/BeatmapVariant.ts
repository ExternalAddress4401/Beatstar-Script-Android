//@ts-nocheck

import SongTemplate from "./SongTemplate.js";
import SongDifficulty from "./SongDifficulty.js";
import UnityAsset from "./UnityAsset.js";
import AnimationCurveTO from "./AnimationCurveTO.js";
import BeatmapType, { BeatmapTypeEnum } from "./BeatmapType.js";

export default class BeatmapVariant {
  id: number;
  idLabel: string;
  Song_id: number;
  _Song: SongTemplate;
  MaxNumLanes: number;
  MaxScore: number;
  Difficulty_id: number;
  _Difficulty: SongDifficulty;
  Version: number;
  IsComplete: boolean;
  InteractionsReference_id: number;
  _InteractionsReference: any;
  NumStars: number; //sections
  InteractionsAsset_id: string;
  _InteractionsAsset: UnityAsset;
  botScoreCurve: AnimationCurveTO;
  Description: string;
  BeatmapType: BeatmapType;
  path: string;

  constructor(id: number, path: string) {
    this.Song_id = id;
    this.path = path;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;

    let template = RakshaModel.class(
      "com.spaceape.config.BeatmapVariant"
    ).alloc();
    template.method(".ctor").invoke(root);

    template.field("id").value = this.id;
    template.field("idLabel").value = Il2Cpp.string(this.idLabel);
    template.field("Song_id").value = this.Song_id;
    template.field("_Song").value = this._Song.build();
    template.field("MaxNumLanes").value = this.MaxNumLanes;
    template.field("MaxScore").value = this.MaxScore; //to be calculated

    template.field("Difficulty_id").value = this.Difficulty_id;
    template.field("_Difficulty").value = this._Difficulty.build();
    template.field("Version").value = this.Version;
    template.field("IsComplete").value = this.IsComplete;
    template.field("InteractionsReference_id").value =
      this.InteractionsReference_id;
    if (this._InteractionsReference) {
      template.field("_InteractionsReference").value =
        this._InteractionsReference;
    }
    template.field("NumStars").value = this.NumStars;
    template.field("InteractionsAsset_id").value = Il2Cpp.string(
      this.InteractionsAsset_id
    );
    if (this._InteractionsAsset) {
      template.field("_InteractionsAsset").value =
        this._InteractionsAsset.build();
    }
    if (this.botScoreCurve) {
      template.field("botScoreCurve").value = null;
    }
    template.field("Description").value = Il2Cpp.string(this.Description);
    template.field("BeatmapType").value = this.BeatmapType.build();

    return template;
  }
  test() {
    //this.id = 508;
    this.id = 2223;
    this.idLabel = "77-1";
    this._Song = new SongTemplate(this.Song_id, this.path);
    this._Song.test();
    this.MaxNumLanes = 3;
    //this.MaxScore = 235200;
    this.MaxScore = 935200;
    this.Difficulty_id = 3;
    this._Difficulty = new SongDifficulty();
    this._Difficulty.test();
    this.Version = 1;
    this.IsComplete = true;
    this.InteractionsReference_id = 2223;
    //this.InteractionsReference_id = 508;
    this._InteractionsReference = null;
    this.NumStars = 5;
    this.InteractionsAsset_id = "5f2e85c4a16fd491c9527e2c25764141";
    this._InteractionsAsset = new UnityAsset(
      "5f2e85c4a16fd491c9527e2c25764141",
      "Assets/beatmapInteractions/508.bytes",
      this.path + "chart.bundle"
    );
    this.Description = "Hard";
  }
  changeDetails(
    name: string,
    artist: string,
    bpm: number,
    sections: number,
    maxScore: number,
    numberOfLanes: number,
    type: string
  ) {
    this._Song.changeDetails(name, artist, bpm);
    this.NumStars = sections;
    this.MaxScore = maxScore;
    this.MaxNumLanes = numberOfLanes;
    this.BeatmapType = type
      ? new BeatmapType(type as BeatmapTypeEnum)
      : new BeatmapType("Regular");
  }
}
