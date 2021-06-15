FROM node:14.15.4-stretch-slim

WORKDIR /app
COPY package*.json ./
# COPY src/assets ./build/src/assets
RUN npm install

COPY . ./

CMD ["npm", "run", "start"]
