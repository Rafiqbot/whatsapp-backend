# Utilise une image Node officielle
FROM node:18-slim

# Installe les dépendances nécessaires à Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Crée le dossier de l’app
WORKDIR /app

# Copie les fichiers
COPY . .

# Installe les dépendances npm
RUN npm install

# Lance ton app
CMD ["npm", "start"]
