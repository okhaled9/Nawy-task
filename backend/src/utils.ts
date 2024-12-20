import { drizzle } from "drizzle-orm/node-postgres";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { MultipartFile } from "@fastify/multipart";
import fs from "fs";
import { apartmentsTable } from "./drizzle/schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const imageFolderPath = resolve(__dirname, "..", "public", "images");

export const db = drizzle(process.env.DATABASE_URL!);

export type BufferedFile = {
  buffer: Buffer;
  ext: string;
};

export async function bufferFile(part: MultipartFile): Promise<BufferedFile | null> {
  const fileExt = part.filename.split(".").pop();
  if (!fileExt) return null;
  
  const buffer = await part.toBuffer();
  return { buffer, ext: fileExt };
}

export function processFormField(
  apartment: typeof apartmentsTable.$inferInsert,
  fieldname: string,
  value: string
) {
  switch (fieldname) {
    case "title":
    case "address":
    case "description":
      apartment[fieldname] = value;
      break;
    case "area":
    case "price":
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue)) {
        apartment[fieldname] = parsedValue;
      }
      break;
  }
  return apartment;
}

export function validateApartment(apartment: typeof apartmentsTable.$inferInsert): boolean {
  return Boolean(apartment.title && apartment.address && apartment.area && apartment.price);
}

export function generateFilename(ext: string): string {
  const now = new Date();
  const date = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
  const time = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
  return `${date}__${time}.${ext}`;
}

export async function saveFile(buffer: Buffer, filename: string): Promise<void> {
  const filePath = resolve(imageFolderPath, filename);
  fs.mkdirSync(imageFolderPath, { recursive: true });
  await fs.promises.writeFile(filePath, buffer);
}
