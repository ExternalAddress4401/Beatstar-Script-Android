import Java from "frida-java-bridge";
import SettingsReader from "./SettingsReader";

/**
 * Sends network requests to the server HTTP server. Mostly used for grabbing
 * custom scores as we can't send them with the SyncResp since we don't have
 * difficulties to calculate medals and the star count would be inaccurate.
 * @param path route
 * @param body payload
 * @returns
 */
export const deviceNetworkRequest = (
  path: string,
  body: any = {}
): Promise<string | null> => {
  return new Promise(function (resolve, reject) {
    const serverIp = SettingsReader.getSetting("serverIp") ?? "beatstarmod.app";
    const serverPort = SettingsReader.getSetting("serverPort") ?? 4000;

    const targetUrl = "http://" + serverIp + ":" + serverPort + path;

    body = JSON.stringify(body);

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

      let os;
      try {
        os = conn.getOutputStream();
      } catch (e) {
        resolve(null);
        return;
      }

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
      var ret: string | null = null;
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
      resolve(ret as string);
    });
  });
};
