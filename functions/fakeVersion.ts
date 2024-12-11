import "frida-il2cpp-bridge";

export const fakeVersion = () => {
  const client = Il2Cpp.domain.assembly("raksha-client").image;
  client
    .class("raksha.ProtoOutput")
    .method("Write")
    .overload("System.UInt32", "System.String").implementation = function (
    field,
    value
  ) {
    // game version
    if (value.toString() === '"34.0.0.728"') {
      value = Il2Cpp.string("35.0.0.8150");
    }
    this.method("Write")
      .overload("System.UInt32", "System.String")
      .invoke(field, value);
  };
  client
    .class("raksha.ProtoOutput")
    .method("Write")
    .overload("System.UInt32", "System.Int32").implementation = function (
    field,
    value
  ) {
    // logic version
    if (value === 3400) {
      value = 3500;
    }
    this.method("Write")
      .overload("System.UInt32", "System.Int32")
      .invoke(field, value);
  };
};
