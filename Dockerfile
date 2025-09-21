# Étape 1 : partir de Node
FROM node:20

# Installer nginx
RUN apt-get update && apt-get install -y nginx \
  && rm -rf /var/lib/apt/lists/*

# Installer pm2 globalement
#RUN npm install -g pm2

# Copier ton application Node
WORKDIR /app
COPY package*.json ./
RUN npm install

# Exposer les ports
EXPOSE 80

# Script de démarrage supervisé par PM2 et Nginx
#CMD service nginx start && pm2-runtime start ecosystem.config.js
