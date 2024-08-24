const esbuild = require("esbuild");
const fs = require("fs");

const outfile = "file.js";

/**
 * Crypto isn't supported without a shim so we'll use xor encoding instead
 * This function encodes and decodes a string. Running it on an encoded string
 * will return the unencoded version.
 */
const xor = (data) => {
  const str = data.split("");

  const xorKey = "bf3c199c2470cb477d907b1e0917c17b";

  for (let i = 0; i < str.length; i++) {
    str[i] = String.fromCharCode(str[i].charCodeAt(0) ^ xorKey.charCodeAt(0));
  }
  return str.join("");
};

async function build(prod, test, agent) {
  await esbuild.build({
    entryPoints: [
      test
        ? "./test/test.js"
        : agent
        ? "./agent/agent.js"
        : "./device/device.js",
    ],
    bundle: true,
    outfile,
    minify: prod,
    plugins: [shim],
  });
}

/**
 * ESBuild doesn't natively support these like frida-compile so we need to specify them here
 * The -node flag doesn't work for this
 */
let shim = {
  name: "shim",
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      const shims = [
        { name: "buffer", entry: "@frida/buffer/index.js" },
        { name: "http", entry: "@frida/http/index.js" },
        { name: "events", entry: "@frida/events/events.js" },
        { name: "net", entry: "@frida/net/index.js" },
        { name: "util", entry: "@frida/util/util.js" },
        { name: "stream", entry: "@frida/stream/index.js" },
        { name: "assert", entry: "@frida/assert/assert.js" },
        { name: "process", entry: "@frida/process/index.js" },
        {
          name: "string_decoder",
          entry: "@frida/string_decoder/lib/string_decoder.js",
        },
        { name: "path", entry: "@frida/path/index.js" },
        { name: "timers", entry: "@frida/timers/index.js" },
        { name: "url", entry: "@frida/url/url.js" },
        { name: "crypto", entry: "crypto-browserify/index.js" },
      ];
      const shim = shims.find((el) => el.name == args.path);
      if (shim) {
        return {
          path: `${__dirname}/node_modules/${shim.entry}`,
          namespace: "file",
        };
      }
    });
  },
};

/**
 * Something in the assert library is broken so we need to do some patching here.
 * - assert2 in the non minified file is undefined to we comment out those asserts
 * - in the minified file we add an empty OK function to the exported assert object
 */
async function run() {
  const prod = process.argv.includes("-prod");
  const test = process.argv.includes("-test");
  const agent = process.argv.includes("-agent");

  await build(prod, test, agent);
  let file = fs
    .readFileSync(`./${outfile}`)
    .toString()
    .replaceAll(
      "bo.HTTPParser=T",
      "go.ok=function(){return true;};go.equal=function(){return true;};bo.HTTPParser=T"
    )
    .split("\n");
  for (var i = 0; i < file.length; i++) {
    const line = file[i].trim();
    if (line.startsWith("exports.HTTPParser = HTTPParser2;")) {
      file[i] =
        "assert2.ok=function(){return true;};assert2.equal=function(){return true;};" +
        line;
    }
  }

  if (prod) {
    const write = prod ? xor(file.join("\n")) : file.join("\n");
    fs.writeFileSync(`./${outfile}`, Buffer.from(write).toString("base64"));
  } else {
    fs.writeFileSync(`./${outfile}`, file.join("\n"));
  }
}

run();
