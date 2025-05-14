# Utiliser une image Node officielle avec les dépendances Puppeteer
FROM node:18-slim

# Installer les dépendances système requises
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
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Créer un dossier pour l'app
WORKDIR /app

# Copier les fichiers de l'app
COPY . .

# Installer les dépendances Node
RUN npm install

# Lancer ton app
CMD [ "node", "whatsapp.js" ]
