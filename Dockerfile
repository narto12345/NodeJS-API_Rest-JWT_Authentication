FROM node:20

LABEL maintainer="com.bitstea"

# Establecer las variables de entorno
# ENV PORT=80
# ENV HOST=mysql-node-jwt
# ENV PASSWORD=qwerty123

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
