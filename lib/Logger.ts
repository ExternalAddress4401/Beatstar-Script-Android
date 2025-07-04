import Java from "frida-java-bridge";

class Logger {
  constructor() {
    //empty the file
    try {
      Java.use("java.io.PrintWriter").$new("sdcard/beatstar/log.txt");
    } catch (e) {
      this.log("Looks like we're missing storage permissions.");
    }
  }
  log(str: string) {
    var Log = Java.use("android.util.Log");
    Log.v("beatstar", str);
    console.log(str);

    try {
      const writer = Java.use("java.io.BufferedWriter").$new(
        Java.use("java.io.FileWriter").$new("sdcard/beatstar/log.txt", true)
      );
      const writeStr = Java.use("java.lang.String").$new(
        `[${new Date().toISOString()}] - ${str} \n`
      );
      const cs = Java.cast(writeStr, Java.use("java.lang.CharSequence"));
      writer.append(cs);
      writer.flush();
      writer.close();
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Logger();
