import UnityAsset from "./UnityAsset.js";
import GradientTO from "./GradientTO.js";
import LegalState from "./LegalState.js";
import SongContentState from "./SongContentState.js";
import SongTag from "./SongTag.js";
import WwiseSwitch from "./WwiseSwitch.js";
import SongStreakColorTemplate from "./SongStreakColorTemplate.js";
import Translation from "./Translation.js";
import SongMetaTemplate from "./SongMetaTemplate.js";

interface ColorGradient {
  color: string;
  time: number;
}

interface StreakConfig {
  glowColor: string;
  perfectBarColor: string;
  invertPerfectBar: boolean;
  VFXColor: string;
}

export default class SongTemplate {
  id: number;
  BPM: number;
  //weighting tags
  CoverArtAsset_id: string;
  _CoverArtAsset: UnityAsset;
  TimeSignature: number;
  BaseColor: string;
  DarkColor: string;
  ColorGradient: ColorGradient[];
  GenreTags_id: number[];
  _GenreTags: SongTag[];
  WwiseSwitch: WwiseSwitch;
  CheckpointOutlineColour: string;
  ColorGradientInGame: ColorGradient[];
  StreakConfig: StreakConfig[];
  TrackIntensityGlow: string;
  VFXColor: string;
  VFXAlternativeColor: string;
  BibleId: string;
  idLabel: string;
  ISRC: string;
  LegalState: LegalState;
  SongContentState: SongContentState;
  LegalAttribution: string;
  SilentBeats: number;
  MusicFileSourceID: number;
  SongTitleLoc_id: string;
  _SongTitleLoc: Translation;
  SongArtistLoc_id: string;
  _SongArtistLoc: Translation;
  MusicKitData_id: number;
  _MusicKitData: any;
  //groups_id
  //goroups
  //HoldHapticTypeOverride
  //HoldScoringBeatTypeOverride
  //bangroup_id
  //SongMeta_id
  SongMeta: SongMetaTemplate;
  //sku_id
  //sku
  audioAsset_id: string;
  _audioAsset: UnityAsset;
  path: string;

  constructor(id: number, path: string) {
    this.id = id;
    this.path = path;
  }
  from(object: any) {
    this.id = object.id;
    this.BPM = object.BPM;
    this.CoverArtAsset_id = object.CoverArtAsset_id;
    this._CoverArtAsset = object._CoverArtAsset;
    this.TimeSignature = object.TimeSignature;
    this.BaseColor = object.BaseColor;
    this.DarkColor = object.DarkColor;
    this.ColorGradient = object.ColorGradient;
    this.GenreTags_id = object.GenreTags_id;
    this._GenreTags = object._GenreTags;
    this.WwiseSwitch = new WwiseSwitch(
      object.WwiseSwitch.switchId,
      object.WwiseSwitch.switchState
    );
    this.CheckpointOutlineColour = object.CheckpointOutlineColour;
    this.ColorGradientInGame = object.ColorGradientInGame;
    this.StreakConfig = object.StreakConfig.map(
      (el) =>
        new SongStreakColorTemplate(
          el.glowColor,
          el.perfectBarColor,
          el.invertPerfectBar,
          el.VFXColor
        )
    );
    this.TrackIntensityGlow = object.TrackIntensityGlow;
    this.VFXColor = object.VFXColor;
    this.VFXAlternativeColor = object.VFXAlternativeColor;
    this.BibleId = object.BibleId;
    this.idLabel = object.idLabel;
    this.ISRC = object.ISRC;
    this.LegalState = new LegalState(object.LegalState);
    this.SongContentState = new SongContentState(object.SongContentState);
    this.LegalAttribution = object.LegalAttribution;
    this.SilentBeats = object.SilentBeats;
    this.MusicFileSourceID = object.MusicFileSourceID;
    this.SongTitleLoc_id = object.SongTitleLoc_id;
    this._SongTitleLoc = object._SongTitleLoc;
    this.SongArtistLoc_id = object.SongArtistLoc_id;
    this._SongArtistLoc = object._SongArtistLoc;
    this.MusicKitData_id = object.MusicKitData_id;
    this._MusicKitData = object._MusicKitData;
    this.SongMeta = object.SongMeta;
  }
  build() {
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const mscorlib = Il2Cpp.domain.assembly("mscorlib").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;

    let template = RakshaModel.class(
      "com.spaceape.config.SongTemplate"
    ).alloc();
    template.method(".ctor").invoke(root);

    if (this.id) template.field("id").value = this.id;
    if (this.BPM) template.field("BPM").value = this.BPM;
    if (this.CoverArtAsset_id)
      template.field("CoverArtAsset_id").value = Il2Cpp.string(
        this.CoverArtAsset_id
      );
    if (this._CoverArtAsset)
      template.field("_CoverArtAsset").value = this._CoverArtAsset.build();
    if (this.TimeSignature)
      template.field("TimeSignature").value = this.TimeSignature;
    if (this.BaseColor)
      template.field("BaseColor").value = Il2Cpp.string(this.BaseColor);
    if (this.DarkColor)
      template.field("DarkColor").value = Il2Cpp.string(this.DarkColor);

    if (this.ColorGradient)
      template.field("ColorGradient").value = new GradientTO(
        this.ColorGradient
      ).build();

    if (this.GenreTags_id)
      template.field("GenreTags_id").value = Il2Cpp.array(
        mscorlib.class("System.UInt32"),
        this.GenreTags_id
      );
    if (this._GenreTags)
      template.field("_GenreTags").value = Il2Cpp.array(
        RakshaModel.class("com.spaceape.config.SongTag"),
        this._GenreTags.map((el) => el.build())
      );
    if (this.WwiseSwitch)
      template.field("WwiseSwitch").value = this.WwiseSwitch.build();
    if (this.CheckpointOutlineColour)
      template.field("CheckpointOutlineColour").value = Il2Cpp.string(
        this.CheckpointOutlineColour
      );
    if (this.ColorGradientInGame)
      template.field("ColorGradientInGame").value = new GradientTO(
        this.ColorGradientInGame
      ).build();

    if (this.StreakConfig) {
      const streaks = this.StreakConfig.map(
        (el) =>
          new SongStreakColorTemplate(
            el.glowColor,
            el.perfectBarColor,
            el.invertPerfectBar,
            el.VFXColor
          )
      );
      template.field("StreakConfig").value = Il2Cpp.array(
        RakshaModel.class("com.spaceape.config.SongStreakColorTemplate"),
        streaks.map((el) => el.build())
      );
    }

    if (this.TrackIntensityGlow)
      template.field("TrackIntensityGlow").value = Il2Cpp.string(
        this.TrackIntensityGlow
      );
    if (this.VFXColor)
      template.field("VFXColor").value = Il2Cpp.string(this.VFXColor);
    if (this.VFXAlternativeColor)
      template.field("VFXAlternativeColor").value = Il2Cpp.string(
        this.VFXAlternativeColor
      );
    if (this.BibleId)
      template.field("BibleId").value = Il2Cpp.string(this.BibleId);
    if (this.idLabel)
      template.field("idLabel").value = Il2Cpp.string(this.idLabel);
    if (this.ISRC) template.field("ISRC").value = Il2Cpp.string(this.ISRC);
    if (this.LegalState)
      template.field("LegalState").value = new LegalState("Approved").build();
    if (this.SongContentState)
      template.field("SongContentState").value = new SongContentState(
        "Master"
      ).build();
    if (this.LegalAttribution)
      template.field("LegalAttribution").value = Il2Cpp.string(
        this.LegalAttribution
      );
    if (this.SilentBeats)
      template.field("SilentBeats").value = this.SilentBeats;
    if (this.MusicFileSourceID)
      template.field("MusicFileSourceID").value = this.MusicFileSourceID;
    if (this.SongTitleLoc_id)
      template.field("SongTitleLoc_id").value = Il2Cpp.string(
        this.SongTitleLoc_id
      );
    if (this._SongTitleLoc)
      template.field("_SongTitleLoc").value = this._SongTitleLoc.build();
    if (this.SongArtistLoc_id)
      template.field("SongArtistLoc_id").value = Il2Cpp.string(
        this.SongArtistLoc_id
      );
    if (this._SongArtistLoc)
      template.field("_SongArtistLoc").value = this._SongArtistLoc.build();
    if (this.SongMeta) {
      this.SongMeta = new SongMetaTemplate(this.id, this.idLabel);
    }
    template.field("_audioAsset").value = this._audioAsset.build();

    return template;
  }
  test() {
    this.BPM = 140;
    this.CoverArtAsset_id = "292f1a28f6388794f87eae271f91692b";
    this._CoverArtAsset = new UnityAsset(
      "292f1a28f6388794f87eae271f91692b",
      "Assets/Textures/AlbumArtwork/FooFighter_Everlong.png",
      this.path + "artwork.bundle"
    );
    this.TimeSignature = 4;
    this.BaseColor = "1467A1"; //top circle color
    this.DarkColor = "00254C"; //bottom circle color
    this.ColorGradient = [
      { color: "2282B3", time: 0 },
      { color: "00356C", time: 0.5000076293945313 },
      { color: "000C25", time: 1 },
    ];
    this.GenreTags_id = [12];
    this._GenreTags = [new SongTag()];
    this._GenreTags[0].test();
    this.WwiseSwitch = new WwiseSwitch(39444145, 542719590);
    this.CheckpointOutlineColour = "1467A1";
    this.ColorGradientInGame = [
      //background colors
      { color: "C5192D", time: 0 },
      { color: "F24928", time: 1 },
    ];
    this.StreakConfig = [
      {
        glowColor: "0A1926",
        perfectBarColor: "",
        invertPerfectBar: false,
        VFXColor: "006795",
      },
      {
        glowColor: "0E2539",
        perfectBarColor: "",
        invertPerfectBar: false,
        VFXColor: "006992",
      },
      {
        glowColor: "11314c",
        perfectBarColor: "",
        invertPerfectBar: false,
        VFXColor: "006A8F",
      },
      {
        glowColor: "143D60",
        perfectBarColor: "",
        invertPerfectBar: true,
        VFXColor: "0E82AF",
      },
    ];
    this.TrackIntensityGlow = "145F95"; //full background color
    this.VFXColor = "003B6C"; //slight star outline at the top
    this.VFXAlternativeColor = "005F8E"; //???
    this.BibleId = "TST00025";
    //this.BibleId = 'TST00026';
    this.idLabel = this.path;
    this.ISRC = "";
    this.LegalState = new LegalState("Approved");
    this.SongContentState = new SongContentState("Master");
    this.LegalAttribution = "";
    this.SilentBeats = 0;
    this.MusicFileSourceID = 0;
    this.SongTitleLoc_id = `Song-${this.id}-title`;
    //this._SongTitleLoc = new Translation("Song-78-title", "Everlong");
    this.SongArtistLoc_id = `Song-${this.id}-artist`;
    //this._SongArtistLoc = new Translation("Song-78-artist", "Foo Fighters");
    this.MusicKitData_id = null;
    this._MusicKitData = null;
    this.SongMeta = new SongMetaTemplate(this.id, this.idLabel);

    this._audioAsset = new UnityAsset(
      "292f1a28f6388794f87eae271f91692c",
      "Assets/Audio/Banks/TST00026.bytes",
      this.path + "audio.bundle"
    );
  }
  changeDetails(name: string, artist: string, bpm: number) {
    //this._SongTitleLoc = new Translation(name, "");
    //this._SongArtistLoc = new Translation(artist, "");
    this.BPM = bpm;
  }
}
