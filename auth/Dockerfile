FROM node:alpine

WORKDIR /app
COPY package.json . 
RUN npm install --omit=dev
COPY . . 
RUN npx prisma generate

# CMD ["sh", "-c", "until nc -z auth-postgres 5432; do echo 'Waiting for database...'; sleep 2; done; npx prisma migrate deploy && npm run dev"]
# CMD ["sh", "-c", "until nc -z auth-postgres 5432; do echo 'Waiting for database...'; sleep 2; done; npx prisma migrate dev --name init && npm run dev"]
# CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run dev"]

CMD ["npm", "run", "dev"]         
