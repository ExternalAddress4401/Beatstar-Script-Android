export default class Translation {
  id: string;
  translations: LangStrings[] = [];
  oldDoNotTranslateForBinaryCompatibility: boolean;
  translationFlags: number;
  maxCharacters: number;
  comment: string;
  context: string;

  constructor(id: string, value: string, locale = "en") {
    this.id = id;
    this.oldDoNotTranslateForBinaryCompatibility = false;
    this.translations.push(new LangStrings(locale, value));
    this.translationFlags = 0;
  }
  build() {
    const lang = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;
    let translation = lang.class("com.spaceape.sharedlang.Translation").alloc();
    translation.method(".ctor").invoke(root);

    translation.field("id").value = Il2Cpp.string(this.id);
    translation.field("oldDoNotTranslateForBinaryCompatibility").value =
      this.oldDoNotTranslateForBinaryCompatibility;
    translation.field("translations").value = Il2Cpp.array(
      lang.class("com.spaceape.sharedlang.LangStrings"),
      this.translations.map((el) => el.build())
    );
    translation.field("translationFlags").value = this.translationFlags;
    translation.field("maxCharacters").value = 32;
    translation.field("comment").value = Il2Cpp.string("");
    translation.field("context").value = Il2Cpp.string("");

    return translation;
  }
}

class LangStrings {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
  build() {
    const lang = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
    const root = Il2Cpp.domain
      .assembly("Assembly-CSharp")
      .image.class("Config")
      .field("Root").value as Il2Cpp.Object;
    let langStrings = lang.class("com.spaceape.sharedlang.LangStrings").alloc();
    langStrings.method(".ctor").invoke(root);

    langStrings.field("key").value = Il2Cpp.string(this.key);
    langStrings.field("value").value = Il2Cpp.string(this.value);

    return langStrings;
  }
}
