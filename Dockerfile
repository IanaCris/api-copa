FROM node:14 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run start:build

# as build step❓

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build

# 👇 copy prisma directory
COPY --from=builder /app/prisma ./prisma

EXPOSE 3333
# or during execution ❓
CMD [ "npm", "run", "start:migrate:prod" ]
