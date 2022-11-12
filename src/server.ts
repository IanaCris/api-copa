import Fastify from "fastify";
import cors from "@fastify/cors";

import { groupRoutes } from "./routes/groups";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true,
    });

    await fastify.register(groupRoutes);


    await fastify.listen({ port: 3333 });
    // await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap();