FROM node:12.18.2-alpine3.11

WORKDIR /home

COPY charger/ ./

RUN npm install

EXPOSE 8093
CMD ["node", "index.js"]
