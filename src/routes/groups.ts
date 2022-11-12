import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function groupRoutes(fastify: FastifyInstance) {

  fastify.get('/groups/count', async () => {
    const count = await prisma.group.count()

    return { count };
  });

  fastify.get('/groups', async (req, res) => {
    const countries = await prisma.group.findMany()
    return countries
  })


  fastify.post('/groups', async (request, reply) => {
    const createGroupBody = z.object({
      name: z.string(),
    })

    const { name } = createGroupBody.parse(request.body)

    try {

      await prisma.group.create({
        data: {
          name
        }
      })

    } catch {
      await prisma.group.create({
        data: {
          name
        }
      })

    }

    return reply.status(201).send({ name })
  });

}