FROM node:20.18.0-alpine AS builder
WORKDIR /usr/src/app
COPY node_auth_server/package*.json ./
RUN npm install
COPY node_auth_server .

FROM node:20.18.0-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app /usr/src/app
EXPOSE 3000
CMD ["npm", "start"]