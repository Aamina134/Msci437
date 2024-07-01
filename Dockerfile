FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

# Command to run the application using serve
CMD ["serve", "-s", "dist", "-l", "3000"]

