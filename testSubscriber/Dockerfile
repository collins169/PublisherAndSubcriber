FROM node:14-alpine
WORKDIR /usr/src/app/testSubscriber
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 5001
EXPOSE 5002
ENV NODE_ENV production
CMD [ "node", "app.js" ]