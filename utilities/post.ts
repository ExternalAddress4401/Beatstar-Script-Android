import Logger from "../lib/Logger";
import SettingsReader from "../lib/SettingsReader";

export const post = (
  path: string,
  body: string,
  onReceive: (val: any) => void
) => {
  const host = SettingsReader.getSetting("ip")
    ? SettingsReader.getSetting("ip")
    : "143.110.226.4";
  const port = SettingsReader.getSetting("port")
    ? SettingsReader.getSetting("port")
    : 5000;

  const targetUrl = "http://" + host + ":" + port + path;

  Java.perform(function () {
    var HttpURLConnection = Java.use("java.net.HttpURLConnection");
    var URL = Java.use("java.net.URL");
    var BufferedReader = Java.use("java.io.BufferedReader");
    var BufferedWriter = Java.use("java.io.BufferedWriter");
    var BufferedOutputStream = Java.use("java.io.BufferedOutputStream");
    var OutputStreamWriter = Java.use("java.io.OutputStreamWriter");
    var StringBuilder = Java.use("java.lang.StringBuilder");
    var InputStreamReader = Java.use("java.io.InputStreamReader");

    var url = URL.$new(Java.use("java.lang.String").$new(targetUrl));
    var conn = url.openConnection();
    conn = Java.cast(conn, HttpURLConnection);
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Content-Type", "application/json");
    conn.setConnectTimeout(5000);
    conn.setReadTimeout(5000);
    conn.setDoInput(true);
    conn.setDoOutput(true);
    conn.setChunkedStreamingMode(0);

    const os = conn.getOutputStream();
    const out = BufferedOutputStream.$new(os);
    const osw = OutputStreamWriter.$new(
      out,
      Java.use("java.lang.String").$new("UTF-8")
    );
    var writer = BufferedWriter.$new(osw);
    writer.$super.write(Java.use("java.lang.String").$new(body));
    writer.flush();
    writer.close();
    os.close();

    conn.connect();
    var code = conn.getResponseCode();
    var ret = null;
    if (code == 200) {
      var inputStream = conn.getInputStream();
      var buffer = BufferedReader.$new(InputStreamReader.$new(inputStream));
      var sb = StringBuilder.$new();
      var line = null;
      while ((line = buffer.readLine()) != null) {
        sb.append(line);
      }
      ret = sb.toString();
    }
    conn.disconnect();
    onReceive(ret);
  });
};
