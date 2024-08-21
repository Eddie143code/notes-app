import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const server: FastifyInstance = Fastify({});

// Uncomment if using fastify-postgres for other purposes
// server.register(fastifyPostgres, {
//   connectionString: "postgres://postgres:@localhost:5432/productivity-app",
// });

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async (request, reply) => {
  return { pong: "it worked!" };
});

server.post("/users/create", async (request: any, reply) => {
  try {
    const user = await prisma.user.create({
      data: request.body,
    });

    return user;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return error;
  }
});

server.get("/users", async (request, reply) => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    server.log.error(error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    server.log.info(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
