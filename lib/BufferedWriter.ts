import { Buffer } from "buffer";

export class BufferedWriter {
  index: number = 0;
  buffer: Buffer;

  constructor() {
    this.buffer = Buffer.alloc(10000);
  }
  writeInt(value: number) {
    this.buffer.writeUInt32LE(value, this.index);
    this.index += 4;
  }
  getBuffer() {
    return this.buffer.slice(0, this.index);
  }
}
