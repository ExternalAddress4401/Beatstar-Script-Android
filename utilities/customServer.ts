import Logger from "../lib/Logger";
import SettingsReader from "../lib/SettingsReader";

/**
 * Swaps the server IP's for the custom server IP.
 */
export const customServer = () => {
  const network = Il2Cpp.domain.assembly("SpaceApe.Network").image;

  network.class("EndPointConfig").method(".ctor").implementation = function (
    host: Il2Cpp.String,
    port: number,
    name: Il2Cpp.String,
    secret: Il2Cpp.String
  ) {
    const serverIp = SettingsReader.getSetting("serverIp");
    host = serverIp
      ? Il2Cpp.string(serverIp)
      : Il2Cpp.string("beatstarmod.app");
    port = SettingsReader.getSetting("serverPort") ?? 3000;
    Logger.log(`Using server: ${host}:${port}`);
    this.method(".ctor").invoke(host, port, name, secret);
    if (serverIp) {
      this.field("useSsl").value = false;
    }
  };
};
