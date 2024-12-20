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

  let title: string | undefined;
  let address: string | undefined;
  let description: string | undefined;
  let area: number | undefined;
  let price: number | undefined;
  let fileName: string | undefined;

  for await (const part of parts) {
    if (part.type === "file") {
      if (!fs.existsSync(imageFolderPath)) {
        fs.mkdirSync(imageFolderPath, { recursive: true });
      }

      const fileExt = part.filename.split(".").pop();
      fileName = `${Date.now()}.${fileExt}`;
      const filePath = resolve(imageFolderPath, fileName);

      // Save the file
      part.file.pipe(fs.createWriteStream(filePath));
    } else {
      // Process form fields
      const fieldValue = part.value as string;
      switch (part.fieldname) {
        case "title":
          title = fieldValue;
          break;
        case "address":
          address = fieldValue;
          break;
        case "description":
          description = fieldValue;
          break;
        case "area":
          const parsedArea = parseInt(fieldValue);
          area = !isNaN(parsedArea) ? parsedArea : undefined;
          break;
        case "price":
          const parsedPrice = parseInt(fieldValue);
          price = !isNaN(parsedPrice) ? parsedPrice : undefined;
          break;
      }
    }
  }

  // Validate required fields
  if (!title || !address || !area || !price) {
    return reply.status(400).send({ error: "Missing required fields" });
  }

  // Save to database
  const apartment = {
    title,
    address,
    description: description || undefined,
    area,
    price,
  };

  const result = await db.insert(apartmentsTable).values(apartment);
  return { ...result, fileName };
});

fastify.get("/wipe-apartments", () => {
  return db.delete(apartmentsTable);
});

fastify.post("/test", async (req) => {
  const parts = req.parts();
  for await (const part of parts) {
    // if(!part.file)
    console.log(await part.type);
  }
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
