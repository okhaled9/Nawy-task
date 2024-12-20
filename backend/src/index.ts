import "dotenv/config";
import server from "./server.js";

const start = async () => {
  try {
    const fastify = server();
    await fastify.listen({ host: "0.0.0.0", port: 8000 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
