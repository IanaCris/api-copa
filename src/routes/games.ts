import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { groupBy } from "lodash";

export async function gamesRoutes(fastify: FastifyInstance) {
    const dayWeek = new Array("DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO");

    fastify.get('/games/count', async () => {
        const count = await prisma.game.count()

        return { count }
    });

    fastify.get('/games', async () => {
        const games = await prisma.game.findMany();

        const newListGames = await gameDetails(games);

        return newListGames;
    });

    fastify.get('/games/:id', async (request) => {
        const getGameParams = z.object({
            id: z.string(),
        });

        const { id } = getGameParams.parse(request.params)

        const game = await prisma.game.findUnique({
            where: {
                id,
            }
        })

        return game;
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

        const newListGames = await gameDetails(games);

        return newListGames;
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

        const newListGames = await gameDetails(games);

        return newListGames;
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
            orderBy: {
                date: 'asc',
            },
        });

        const newListGames = await gameDetails(games);

        return newListGames;
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

    async function gameDetails(games: IGame[]) {
        const listFC: any = [];
        const listSC: any = [];

        for (const [index, game] of games.entries()) {
            const fisrtCountry = await prisma.country.findFirst({
                where: {
                    id: game.firstCountryId,
                },
                select: {
                    name: true
                }
            });
            listFC.push(fisrtCountry);

            const secondCountry = await prisma.country.findFirst({
                where: {
                    id: game.secondCountryId,
                },
                select: {
                    name: true
                }
            });
            listSC.push(secondCountry);
        }

        const gamesMoreDetails = games.map((game, index) => {

            const dateBD = new Date(game.date);

            return {
                ...game,
                nameFisrtCountry: listFC[index].name,
                nameSecondCountry: listSC[index].name,
                dateGame: dateBD.getDate() + "/" + (dateBD.getMonth() + 1),
                hourGame: (game.date).toISOString().slice(11, 16),
                dayWeek: dayWeek[dateBD.getDay()]
            };
        });


        const newListGames = groupBy(gamesMoreDetails, "dateGame");
        return newListGames;
    }

    interface IGame {
        id: string;
        date: Date;
        firstCountryId: string;
        secondCountryId: string;
        firstCountryPoints: number;
        secondCountryPoints: number
        createdAt: Date;
        updatedAt: Date;
    }
}