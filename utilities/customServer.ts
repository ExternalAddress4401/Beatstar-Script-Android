import SettingsReader from "../lib/SettingsReader";

/**
 * Swaps the server IP's for the custom server IP.
 */
export const customServer = () => {
  const network = Il2Cpp.domain.assembly("SpaceApe.Network").image;

  network.class("EndPointConfig").method("get_IsMock").implementation =
    function () {
      const ip = SettingsReader.getSetting("serverIp") ?? "beatstarmod.app";
      this.field("host").value = Il2Cpp.string(ip);
      this.field("port").value =
        SettingsReader.getSetting("serverPort") ?? 3000;
      this.field("useSsl").value = false;
      return this.method("get_IsMock").invoke();
    };
};
