import Fastify, { FastifyInstance } from "fastify";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);

const fastify: FastifyInstance = Fastify({ logger: true });

fastify.get("/check", () => {
  return { status: "Server running" };
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
