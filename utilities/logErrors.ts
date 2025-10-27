import Logger from "../lib/Logger";

/**
 * Logs various internal errors normally hidden from Logcat.
 */
export const logErrors = () => {
  const logger = Il2Cpp.domain
    .assembly("SpaceApe.Logger")
    .image.class("Logger");
  logger.method("Warn").implementation = function (message: Il2Cpp.Object) {
    Logger.log(message.toString());
  };
  logger.method("Info").implementation = function (message: Il2Cpp.Object) {
    Logger.log(message.toString());
  };
  logger.method("Log").implementation = function (message: Il2Cpp.Object) {
    Logger.log(message.toString());
  };
  logger.method("Debug").implementation = function (message: Il2Cpp.Object) {
    Logger.log(message.toString());
  };
  logger.method("Error").implementation = function (message: Il2Cpp.Object) {
    Logger.log(message.toString());
  };
};
