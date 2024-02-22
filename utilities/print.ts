export const printIl2Cpp = (obj: Il2Cpp.Object) => {
  console.log("-----" + obj.class.name + "-----");
  for (const key of obj.class.fields) {
    if (key.isStatic) {
      continue;
    }
    const k = obj.field(key.name).value;
    if (k instanceof Il2Cpp.Object) {
      if (!k.isNull()) {
        printIl2Cpp(k);
      }
    }
    console.log(key.name + " " + obj.field(key.name).value);
  }
};
