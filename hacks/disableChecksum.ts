export function disableChecksum() {
  const assembly = Il2Cpp.domain.assembly("RakshaUnity").image;

  assembly.class("ChecksumCalculator").method("Calc").implementation =
    function () {
      return Il2Cpp.string("");
    };
}
