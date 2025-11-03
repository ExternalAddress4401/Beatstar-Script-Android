import Logger from "../lib/Logger";
import SettingsReader from "../lib/SettingsReader";

/**
 * Swaps the server IP's for the custom server IP.
 */
export const customServer = () => {
  const network = Il2Cpp.domain.assembly("SpaceApe.Network").image;

  const timer = setInterval(() => {
    const endpoints = Il2Cpp.gc.choose(network.class("EndPointConfig"));
    if (endpoints) {
      const serverIp = SettingsReader.getSetting("serverIp");
      for (const endpoint of endpoints) {
        console.log(serverIp);
        const ip = SettingsReader.getSetting("serverIp") ?? "beatstarmod.app";
        endpoint.field("host").value = Il2Cpp.string(ip);
        endpoint.field("port").value =
          SettingsReader.getSetting("serverPort") ?? 3000;
        endpoint.field("useSsl").value = false;
      }
      clearInterval(timer);
    }
  }, 1000);
};
