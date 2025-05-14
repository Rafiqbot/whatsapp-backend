const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

// Initialise le client WhatsApp avec une gestion de session locale
const client = new Client({
    authStrategy: new LocalAuth()
});

// Génération du QR Code dans le terminal
client.on('qr', (qr) => {
    console.log('Scanne ce QR code avec ton WhatsApp :');
    qrcode.generate(qr, { small: true });
});

// Confirmation quand le client est prêt
client.on('ready', () => {
    console.log('Le client WhatsApp est connecté et prêt !');
});

// Gestion de la réception de messages
client.on('message', message => {
    console.log(`Message reçu de ${message.from} : ${message.body}`);
    // ici on pourra ajouter GPT-4 plus tard
});

// Démarre le client
client.initialize();
