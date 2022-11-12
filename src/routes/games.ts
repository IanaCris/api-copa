import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function gamesRoutes(fastify: FastifyInstance) {
    fastify.get('/games/count', async () => {
        const count = await prisma.game.count()

        return { count }
    });

    fastify.post('/games', async (request, reply) => {
        const createCountryBody = z.object({
            firstCountryId: z.string(),
            secondCountryId: z.string(),
            date: z.string(),
        })

        const { firstCountryId, secondCountryId, date } = createCountryBody.parse(request.body)

        try {

            await prisma.game.create({
                data: {
                    firstCountryId,
                    secondCountryId,
                    date
                }
            })

        } catch {
            await prisma.game.create({
                data: {
                    firstCountryId,
                    secondCountryId,
                    date
                }
            })

        }

        return reply.status(201).send({ 
            firstCountryId,
            secondCountryId,
            date 
        })
    });
}