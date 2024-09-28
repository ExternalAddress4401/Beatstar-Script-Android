export class BufferedReader {
  index: number = 0;
  buffer: Buffer;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }
  readInt() {
    const i = this.buffer.readUInt32LE(this.index);
    this.index += 4;
    return i;
  }
}
