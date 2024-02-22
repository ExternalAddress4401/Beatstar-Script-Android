export const killErrorHandler = () => {
  const spaceape = Il2Cpp.domain.assembly("SpaceApe.Rpc").image;
  const sharplaModel = Il2Cpp.domain.assembly("SharplaModel").image;
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  spaceape
    .class("com.spaceape.rpc.RpcServices")
    .method("NotifyError").implementation = function () {
    return;
  };

  sharplaModel
    .class("com.spaceape.sharpla.rpcs.SharplaCmdAudit")
    .method("Write").implementation = function () {
    return;
  };

  assembly
    .class("SharplaToRpcExecuter")
    .method("OnLocalExecutionFailure").implementation = function () {
    return;
  };
};
