import { drizzle } from "drizzle-orm/node-postgres";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { MultipartFile } from "@fastify/multipart";
import fs from "fs";
import { eq } from "drizzle-orm";
import { apartmentsTable, imagesTable } from "./drizzle/schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const imageFolderPath = resolve(__dirname, "..", "public", "images");

export const db = drizzle(process.env.DATABASE_URL!);

export type ApartmentWithImages = {
  id: number;
  title: string;
  address: string;
  description: string | null;
  area: number;
  price: number;
  images: {
    id: number;
    path: string;
    apartmentId: number;
  }[];
};

export async function getAllApartments(): Promise<ApartmentWithImages[]> {
  const results = await db
    .select()
    .from(apartmentsTable)
    .leftJoin(imagesTable, eq(imagesTable.apartmentId, apartmentsTable.id))
    .execute();

  return results.reduce<ApartmentWithImages[]>((acc, row) => {
    const existingApartment = acc.find(a => a.id === row.apartments.id);

    if (!existingApartment) {
      acc.push({
        ...row.apartments,
        images: row.images ? [row.images] : []
      });
    } else if (row.images) {
      existingApartment.images.push(row.images);
    }

    return acc;
  }, []);
}

export async function getApartmentByIdFromDb(id: number): Promise<ApartmentWithImages | null> {
  const results = await db
    .select()
    .from(apartmentsTable)
    .leftJoin(imagesTable, eq(imagesTable.apartmentId, apartmentsTable.id))
    .where(eq(apartmentsTable.id, id))
    .execute();

  if (results.length === 0) {
    return null;
  }

  return results.reduce<ApartmentWithImages>((acc, row) => {
    if (!acc.id) {
      return {
        ...row.apartments,
        images: row.images ? [row.images] : []
      };
    }
    if (row.images) {
      acc.images.push(row.images);
    }
    return acc;
  }, {} as ApartmentWithImages);
}

export async function createApartmentInDb(apartment: typeof apartmentsTable.$inferInsert) {
  const [result] = await db.insert(apartmentsTable).values(apartment).returning();
  return result;
}

export async function createImagesInDb(imageRecords: { path: string; apartmentId: number }[]) {
  if (imageRecords.length > 0) {
    return db.insert(imagesTable).values(imageRecords);
  }
}

export async function wipeDatabase() {
  await db.delete(imagesTable);
  return db.delete(apartmentsTable);
}

export type BufferedFile = {
  buffer: Buffer;
  ext: string;
};

export async function bufferFile(
  part: MultipartFile
): Promise<BufferedFile | null> {
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

export function validateApartment(
  apartment: typeof apartmentsTable.$inferInsert
): boolean {
  return Boolean(
    apartment.title && apartment.address && apartment.area && apartment.price
  );
}

export function generateFilename(ext: string): string {
  const now = new Date();
  const date = `${now.getDate().toString().padStart(2, "0")}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getFullYear()}`;
  const time = `${now.getHours().toString().padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}-${now.getSeconds().toString().padStart(2, "0")}`;
  return `${date}__${time}.${ext}`;
}

export async function saveFile(
  buffer: Buffer,
  filename: string
): Promise<void> {
  const filePath = resolve(imageFolderPath, filename);
  fs.mkdirSync(imageFolderPath, { recursive: true });
  await fs.promises.writeFile(filePath, buffer);
}
