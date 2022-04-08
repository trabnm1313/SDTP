FROM node:16.14.2
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "run", "serve"]