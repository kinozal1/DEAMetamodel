FROM node:10.19

WORKDIR /app

COPY package*.json ./
ENV FLASK_RUN_HOST=0.0.0.0
RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]