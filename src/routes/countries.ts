import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function countriesRoutes(fastify: FastifyInstance) {

    fastify.get('/countries', async (req, res) => {
        const countries = await prisma.country.findMany()
        return countries
    })


    fastify.post('/countries', async (request, reply) => {
        const createCountryBody = z.object({
            name: z.string(),
            avatar: z.string(),
            groupId: z.string(),
        })

        const { name, avatar, groupId } = createCountryBody.parse(request.body)

        try {

            await prisma.country.create({
                data: {
                    name,
                    avatar,
                    groupId
                }
            })

        } catch {
            await prisma.country.create({
                data: {
                    name,
                    avatar,
                    groupId
                }
            })

        }

        return reply.status(201).send({ name })
    });
}