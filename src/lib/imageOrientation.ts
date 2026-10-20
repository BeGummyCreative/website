import { readFileSync } from "node:fs";
import { join } from "node:path";

// Reads pixel dimensions straight from a JPEG or PNG header at build time, so
// layouts can size images by their real proportions without hardcoding them.
function readDimensions(bytes: Buffer): { width: number; height: number } | null {
  // PNG: IHDR width/height sit at fixed offsets.
  if (bytes.readUInt32BE(0) === 0x89504e47) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }

  // JPEG: walk segments until a start-of-frame marker.
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    let rotated = false;
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = bytes[offset + 1];
      // A later APP1 (e.g. Adobe XMP) must not reset what the EXIF block said.
      if (marker === 0xe1) rotated ||= exifSwapsAxes(bytes, offset + 4);
      const isStartOfFrame =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isStartOfFrame) {
        const height = bytes.readUInt16BE(offset + 5);
        const width = bytes.readUInt16BE(offset + 7);
        // Browsers apply EXIF rotation, so report the dimensions as displayed.
        return rotated ? { width: height, height: width } : { width, height };
      }
      offset += 2 + bytes.readUInt16BE(offset + 2);
    }
  }

  return null;
}

// Phone photos are often stored sideways with an EXIF orientation of 5-8,
// meaning the image is displayed rotated by 90 degrees.
function exifSwapsAxes(bytes: Buffer, start: number): boolean {
  if (bytes.toString("latin1", start, start + 6) !== "Exif\0\0") return false;
  const tiff = start + 6;
  const littleEndian = bytes.toString("latin1", tiff, tiff + 2) === "II";
  const u16 = (at: number) => (littleEndian ? bytes.readUInt16LE(at) : bytes.readUInt16BE(at));
  const u32 = (at: number) => (littleEndian ? bytes.readUInt32LE(at) : bytes.readUInt32BE(at));
  const directory = tiff + u32(tiff + 4);
  const entries = u16(directory);
  for (let index = 0; index < entries; index += 1) {
    const entry = directory + 2 + index * 12;
    if (u16(entry) === 0x0112) return u16(entry + 8) >= 5;
  }
  return false;
}

const ratioCache = new Map<string, number>();

// Displayed width ÷ height, for layouts that size images by their proportions.
export function imageRatio(publicPath: string): number {
  const cached = ratioCache.get(publicPath);
  if (cached) return cached;

  const dimensions = readDimensions(readFileSync(join(process.cwd(), "public", publicPath)));
  const ratio = dimensions && dimensions.height > 0 ? dimensions.width / dimensions.height : 1.5;
  ratioCache.set(publicPath, ratio);
  return ratio;
}
