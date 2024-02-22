import { getStatus as getAutoplayStatus } from "../functions/autoplay.js";
import { getStatus as getNoFailStatus } from "../functions/noFail.js";

interface Song {
  id: number;
  title: string;
  artist: string;
  score: string;
}

class Beatcharts {
  static sync(song: Song, score: Il2Cpp.Object) {
    const intentClass = Java.use("android.content.Intent");
    const context = Java.use("android.app.ActivityThread")
      .currentApplication()
      .getApplicationContext();

    const intent = intentClass.$new("ru.acted.beatcharts.ScoreHandler");
    intent.addFlags(268435456);

    intent.putExtra("id", song.id.toString());
    intent.putExtra("title", song.title);
    intent.putExtra("artist", song.artist);
    intent.putExtra("score", score.field("absoluteScore").value.toString());
    intent.putExtra(
      "autoplay",
      getAutoplayStatus() === "Autoplay enabled" ? "true" : "false"
    );
    intent.putExtra(
      "nofail",
      getNoFailStatus() === "No fail enabled" ? "true" : "false"
    );
    intent.putExtra("retries", this.getRetryCount() + " retries");
    intent.putExtra("handshake", "cake01");

    try {
      context.startActivity(intent);
    } catch (e) {}
  }
  static getRetryCount() {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

    const screen = Il2Cpp.gc.choose(
      assembly.class("BeatStarRhythmGameFlowListener")
    )[0];
    return screen.field("retryCount").value;
  }
}

export default Beatcharts;
