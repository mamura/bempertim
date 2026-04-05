FROM node:22-bookworm-slim

WORKDIR /var/www/app

COPY app/package*.json ./
RUN npm install

COPY app ./

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000", "--webpack"]