FROM node:12.18.2-alpine3.11

WORKDIR /home

COPY geocoder/ ./

RUN npm install

EXPOSE 8088
CMD ["node", "index.js"]
