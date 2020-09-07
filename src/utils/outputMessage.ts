export default class outputMessage {
    private bufferPosition = 0;
    public bufferx = Buffer.alloc(65535 * 25)

    constructor(buffer: Buffer) {
        let index = 0;
        this.bufferx = buffer
    }

    getByte() {
        return this.bufferx[this.bufferPosition++];
    }

    getU16() {
        let retU16 = this.bufferx[this.bufferPosition] + this.bufferx[this.bufferPosition + 1] * 256;
        this.bufferPosition += 2;
        return retU16;
    }

    getU32() {
        let retU32 = this.bufferx[this.bufferPosition] + this.bufferx[this.bufferPosition + 1] * 256 + this.bufferx[this.bufferPosition + 2] * 65536 + this.bufferx[this.bufferPosition + 3] * 16777216;
        this.bufferPosition += 4;
        return retU32;
    }

    getU64() {
        let retU64 = this.bufferx[this.bufferPosition] + this.bufferx[this.bufferPosition + 1] * 256 + this.bufferx[this.bufferPosition + 2]
            * 65536 + this.bufferx[this.bufferPosition + 3] * 16777216 +
            this.bufferx[this.bufferPosition + 4] * 4294967296 +
            this.bufferx[this.bufferPosition + 5] * 1099511627776 +
            this.bufferx[this.bufferPosition + 6] * 281474976710656 +
            this.bufferx[this.bufferPosition + 7] * 72057594037927936;

        this.bufferPosition += 8;
        return retU64;
    }

    getString() {
        let strLen = this.getU16();
        let retStr = "";
        for (var i = 0; i < strLen; i++)
            retStr += String.fromCharCode(this.bufferx[this.bufferPosition + i]);

        this.bufferPosition += strLen;
        return retStr;
    }
}