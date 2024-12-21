import { FastifyReply, FastifyRequest } from "fastify";
import { apartmentsTable } from "./drizzle/schema.js";
import {
  bufferFile,
  processFormField,
  validateApartment,
  generateFilename,
  saveFile,
  BufferedFile,
  getAllApartments,
  getApartmentByIdFromDb,
  createApartmentInDb,
  createImagesInDb,
  wipeDatabase,
  deleteApartmentById,
} from "./utils.js";

export async function checkServer() {
  return { status: "Server running" };
}

export async function getApartments() {
  return getAllApartments();
}

export async function getApartmentById(
  request: FastifyRequest<{
    Params: { id: number };
  }>,
  reply: FastifyReply
) {
  const apartment = await getApartmentByIdFromDb(request.params.id);

  if (!apartment) {
    return reply.status(404).send({ error: "apartment not found" });
  }

  return apartment;
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
    unitnumber: "",
    project: "",
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

  const result = await createApartmentInDb(apartment);

  const filenames: string[] = [];
  const imageRecords = [];

  for (const { buffer, ext } of bufferedFiles) {
    const filename = generateFilename(ext);
    await saveFile(buffer, filename);
    filenames.push(filename);

    imageRecords.push({
      path: filename,
      apartmentId: result.id,
    });
  }

  await createImagesInDb(imageRecords);

  return { ...result, images: imageRecords };
}

export async function deleteApartment(
  request: FastifyRequest<{
    Params: { id: number };
  }>,
  reply: FastifyReply
) {
  const success = await deleteApartmentById(request.params.id);

  if (!success) {
    return reply.status(404).send({ error: "apartment not found" });
  }

  return reply.status(204).send;
}

export async function wipeApartments() {
  return wipeDatabase();
}
