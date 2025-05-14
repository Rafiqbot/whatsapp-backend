const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { createClient } = require('@supabase/supabase-js');
const express = require('express');
require('dotenv').config();

// Connexion à Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Création du client WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// QR Code pour se connecter
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// Une fois connecté
client.on('ready', () => {
  console.log('✅ Bot connecté à WhatsApp !');
});

// Réception des messages
client.on('message', async (message) => {
  console.log(`📩 Nouveau message de ${message.from}: ${message.body}`);

  if (message.body.toLowerCase() === 'hello') {
    message.reply('Salut 👋, je suis ton assistant WhatsApp !');
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([{ sender: message.from, content: message.body }]);

  if (error) {
    console.error('Erreur en sauvegardant le message :', error);
  } else {
    console.log('Message sauvegardé dans Supabase :', data);
  }
});

// Lancer le client WhatsApp
client.initialize();

// ⭐️ Petit serveur Express pour Railway
const app = express();
app.get('/', (req, res) => res.send('Bot WhatsApp est en ligne 🚀'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur Express actif sur le port ${PORT}`));


