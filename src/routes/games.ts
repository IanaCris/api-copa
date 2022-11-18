import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function gamesRoutes(fastify: FastifyInstance) {
    fastify.get('/games/count', async () => {
        const count = await prisma.game.count()

        return { count }
    });

    fastify.get('/games', async () => {
        const games = await prisma.game.findMany()

        return games;
    });

    fastify.get('/games/:id', async (request) => {
        const getGameParams = z.object({
            id: z.string(),
        });

        const { id } = getGameParams.parse(request.params)

        const games = await prisma.game.findUnique({
            where: {
                id,
            }
        })

        return games;
    });

    fastify.get('/games/:id/country', async (request) => {
        const getCountryParams = z.object({
            id: z.string(),
        });

        const { id } = getCountryParams.parse(request.params)

        const games = await prisma.game.findMany({
            where: {
                OR: [
                    { firstCountryId: id },
                    { secondCountryId: id },
                ],
            }
        });

        return games;
    });

    fastify.get('/games/:id/group', async (request) => {
        const getGroupParams = z.object({
            id: z.string(),
        });

        const { id } = getGroupParams.parse(request.params)

        const countries = await prisma.country.findMany({
            where: {
                groupId: id
            }
        });

        const idsCountries = countries.map((country) => country.id);

        const games = await prisma.game.findMany({
            where: {
                OR: [
                    {
                        firstCountryId: { in: idsCountries }
                    },
                    {
                        secondCountryId: { in: idsCountries }
                    },
                ],
            },
        });

        console.log("Jogos", games);

        return games;
    });

    fastify.post('/games/date', async (request) => {
        const createDateGameBody = z.object({
            date: z.string(),
        });

        const { date } = createDateGameBody.parse(request.body);

        const dateEnd = date + "T23:59:59.000Z";

        const games = await prisma.game.findMany({
            where: {
                date: {
                    gte: new Date(date),
                    lt: new Date(dateEnd)
                },
            },
        });

        return games;
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