import { FastifyReply, FastifyRequest } from "fastify";
import { eq } from "drizzle-orm";
import { apartmentsTable } from "./drizzle/schema.js";
import {
  db,
  bufferFile,
  processFormField,
  validateApartment,
  generateFilename,
  saveFile,
  BufferedFile,
} from "./utils.js";

export async function checkServer() {
  return { status: "Server running" };
}

export async function getApartments() {
  return db.select().from(apartmentsTable);
}

export async function getApartmentById(
  request: FastifyRequest<{
    Params: { id: number };
  }>,
  reply: FastifyReply
) {
  const id = request.params.id;
  const apt = await db
    .select()
    .from(apartmentsTable)
    .where(eq(apartmentsTable.id, id));

  if (apt.length === 0)
    return reply.status(404).send({ error: "apartment not found" });
  return apt;
}

export async function createApartment(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parts = request.parts();
  const bufferedFiles: BufferedFile[] = [];
  const apartment: typeof apartmentsTable.$inferInsert = {
    title: "",
    address: "",
    area: 0,
    price: 0,
  };

  for await (const part of parts) {
    if (part.type === "file") {
      const buffered = await bufferFile(part);
      if (!buffered) {
        return reply.status(400).send({ error: "Invalid file format" });
      }
      bufferedFiles.push(buffered);
    } else {
      processFormField(apartment, part.fieldname, part.value as string);
    }
  }

  if (!validateApartment(apartment)) {
    return reply.status(400).send({ error: "Missing required fields" });
  }

  const filenames: string[] = [];
  for (const { buffer, ext } of bufferedFiles) {
    const filename = generateFilename(ext);
    await saveFile(buffer, filename);
    filenames.push(filename);
  }

  const result = await db.insert(apartmentsTable).values(apartment);
  return { ...result, filenames };
}

export async function wipeApartments() {
  return db.delete(apartmentsTable);
}
