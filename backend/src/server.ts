import Fastify from "fastify";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import {
  checkServer,
  getApartments,
  getApartmentById,
  createApartment,
  wipeApartments,
  deleteApartment,
} from "./endpoints.js";
import { imageFolderPath } from "./utils.js";

function server() {
  const fastify = Fastify({ logger: true });

  fastify.register(fastifyMultipart);
  fastify.register(fastifyStatic, {
    root: imageFolderPath,
    prefix: "/static/",
  });

  fastify.get("/check-server", checkServer);
  fastify.get("/apartments", getApartments);
  fastify.get<{ Params: { id: number } }>("/apartments/:id", getApartmentById);
  fastify.post("/apartments", createApartment);
  fastify.delete<{ Params: { id: number } }>("/apartments/:id", deleteApartment);
  fastify.get("/wipe-apartments", wipeApartments);

  return fastify;
}

export default server;
