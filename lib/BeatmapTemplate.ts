//@ts-nocheck

import { getNullableObject } from "./Utilities.js";
import SongTemplate from "./SongTemplate.js";
import BeatmapVariant from "./BeatmapVariant.js";

enum BeatmapAvailability {
  NOT_AVAILABLE = 0,
  IN_CAMPAIGN = 1,
  OUTSIDE_CAMPAIGN = 2,
  TUTORIAL = 3,
  CALIBRATION = 4,
}

export default class BeatmapTemplate {
  id: number;
  availability: BeatmapAvailability;
  Song_id: number;
  _Song: SongTemplate;
  idLabel: string;
  BeatmapVariantReference_id: number;
  _BeatmapVariantReference: BeatmapVariant;
  path: string;

  constructor(id: number, path: string) {
    this.id = id;
    this.Song_id = id;
    this.availability = BeatmapAvailability.OUTSIDE_CAMPAIGN;
    this.path = path;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

    const root = assembly.class("Config").field("Root").value as Il2Cpp.Object;

    let template = RakshaModel.class(
      "com.spaceape.config.BeatmapTemplate"
    ).alloc();
    template.method(".ctor").invoke(root);

    template.field("id").value = this.id;
    template.field("availability").value = RakshaModel.class(
      "com.spaceape.config.BeatmapAvailability"
    ).field("OutsideCampaign").value;
    template.field("Song_id").value = getNullableObject(this.Song_id);
    template.field("_Song").value = this._Song.build();
    template.field("idLabel").value = Il2Cpp.string(this.idLabel);
    template.field("BeatmapVariantReference_id").value = getNullableObject(
      this.BeatmapVariantReference_id
    );
    template.field("_BeatmapVariantReference").value =
      this._BeatmapVariantReference.build();

    return template;
  }
  test() {
    this._Song = new SongTemplate(this.id, this.path);
    this._Song.test();
    this.idLabel = this.path;
    this.BeatmapVariantReference_id = 508;
    this._BeatmapVariantReference = new BeatmapVariant(this.id, this.path);
    this._BeatmapVariantReference.test();
  }
  changeDetails(
    name: string,
    artist: string,
    bpm: number,
    sections = 5,
    maxScore: number,
    numberOfLanes = 3,
    type: string
  ) {
    this._Song.changeDetails(name, artist, bpm);
    this._BeatmapVariantReference.changeDetails(
      name,
      artist,
      bpm,
      sections,
      maxScore,
      numberOfLanes,
      type
    );
  }
  getDifficultyId() {
    return this._BeatmapVariantReference.Difficulty_id;
  }
}
