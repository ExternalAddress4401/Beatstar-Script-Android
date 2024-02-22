export const sleep = (time: number) => {
  return new Promise<void>(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  });
};
