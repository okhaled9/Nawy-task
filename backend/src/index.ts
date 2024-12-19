import Fastify, { FastifyInstance } from "fastify";

const fastify: FastifyInstance = Fastify({
  logger: true
});

fastify.get("/check", async () => {
  return { status: "Server running" };
});

const start = async () => {
  try {
    await fastify.listen({ port: 8000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
