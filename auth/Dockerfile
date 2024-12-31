FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . . 
RUN npx prisma generate
# RUN npx prisma migrate dev --name init

CMD ["npm", "run", "dev"]         