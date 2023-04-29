# Utilisez une image Node.js comme base
FROM node:18

ENV NODE_ENV=production
# Créez un répertoire de travail pour l'application
WORKDIR /app

# Copiez le fichier package.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Construisez l'application React
RUN npm run build

# Exposez le port 80 pour accéder à l'application dans le navigateur
EXPOSE 80

# Démarrez l'application lorsque le conteneur démarre
CMD ["npm", "run", "start"]