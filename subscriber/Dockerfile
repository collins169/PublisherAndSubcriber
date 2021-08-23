FROM node:14-alpine
WORKDIR /usr/src/app/subscriber
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 5001
ENV NODE_ENV production
CMD [ "node", "app.js" ]