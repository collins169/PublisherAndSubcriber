FROM node:14-alpine
WORKDIR /usr/src/app/publisherServer
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 5000
ENV NODE_ENV production
CMD [ "node", "app.js" ]