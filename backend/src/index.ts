import Fastify, { FastifyInstance } from "fastify";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { apartmentsTable } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL!);

const fastify: FastifyInstance = Fastify({ logger: true });

fastify.get("/check-server", () => {
  return { status: "Server running" };
});

fastify.get("/apartments", () => {
  return db.select().from(apartmentsTable);
});

fastify.get<{ Params: { id: number } }>("/apartments/:id", (req) => {
  const id = req.params.id;

  return db.select().from(apartmentsTable).where(eq(apartmentsTable.id, id));
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
