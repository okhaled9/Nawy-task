import Fastify, { FastifyInstance } from "fastify";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { apartmentsTable } from "./drizzle/schema.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

const db = drizzle(process.env.DATABASE_URL!);

const fastify: FastifyInstance = Fastify({ logger: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imageFolderPath = resolve(__dirname, "..", "public", "images");

// Ensure images directory exists
await import("fs/promises").then(async (fs) => {
  await fs.mkdir(imageFolderPath, { recursive: true });
});

fastify.register(fastifyMultipart);
fastify.register(fastifyStatic, {
  root: imageFolderPath,
  prefix: "/static/",
});

fastify.get("/check-server", () => {
  return { status: "Server running" };
});

fastify.get("/apartments", () => {
  return db.select().from(apartmentsTable);
});

fastify.get<{ Params: { id: number } }>("/apartments/:id", async (req, rep) => {
  const id = req.params.id;
  const apt = await db
    .select()
    .from(apartmentsTable)
    .where(eq(apartmentsTable.id, id));

  if (apt.length === 0)
    return rep.status(404).send({ error: "apartment not found" });
  return apt;
});

fastify.post("/apartments", async (req, reply) => {
  const parts = req.parts();
  let fileBuffer: Buffer | undefined;
  let fileExt: string | undefined;
  const apartment: typeof apartmentsTable.$inferInsert = {
    title: '',
    address: '',
    area: 0,
    price: 0
  };

  for await (const part of parts) {
    if (part.type === "file") {
      fileExt = part.filename.split(".").pop();
      if (!fileExt) {
        return reply.status(400).send({ error: "Invalid file format" });
      }
      // Buffer the file instead of saving it
      fileBuffer = await part.toBuffer();
    } else {
      // Process form fields
      const fieldValue = part.value as string;
      switch (part.fieldname) {
        case "title":
        case "address":
        case "description":
          apartment[part.fieldname] = fieldValue;
          break;
        case "area":
        case "price":
          const parsedValue = parseInt(fieldValue);
          if (!isNaN(parsedValue)) {
            apartment[part.fieldname] = parsedValue;
          }
          break;
      }
    }
  }

  // Validate required fields
  if (!apartment.title || !apartment.address || !apartment.area || !apartment.price) {
    return reply.status(400).send({ error: "Missing required fields" });
  }

  // Only save file if we have all required fields
  let fileName: string | undefined;
  if (fileBuffer && fileExt) {
    const now = new Date();
    const date = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    fileName = `${date}_${time}.${fileExt}`;
    const filePath = resolve(imageFolderPath, fileName);
    
    // Save the file only after validation
    await fs.promises.writeFile(filePath, fileBuffer);
  }

  const result = await db.insert(apartmentsTable).values(apartment);
  return { ...result, fileName };
});

fastify.get("/wipe-apartments", () => {
  return db.delete(apartmentsTable);
});

const start = async () => {
  try {
    await fastify.listen({ host: "0.0.0.0", port: 8000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
