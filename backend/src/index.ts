import Fastify, { FastifyInstance } from "fastify";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { apartmentsTable } from "./drizzle/schema.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const db = drizzle(process.env.DATABASE_URL!);

const fastify: FastifyInstance = Fastify({ logger: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imageFolderPath = resolve(__dirname, "..", "public", "images");

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


fastify.post<{ Body: typeof apartmentsTable.$inferInsert }>("/apartments", (req) => {
  const apartment: typeof apartmentsTable.$inferInsert = {
    title: req.body.title,
    address: req.body.address,
    description: req.body.description,
    area: req.body.area,
    price: req.body.price,
  };

  return db.insert(apartmentsTable).values(apartment);
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
