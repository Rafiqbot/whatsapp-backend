const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Connexion à Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Création du client WhatsApp avec options pour Railway
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

  // Exemple : sauvegarde du message dans Supabase
  const { data, error } = await supabase
    .from('messages')
    .insert([
      { sender: message.from, content: message.body }
    ]);

  if (error) {
    console.error('Erreur en sauvegardant le message :', error);
  } else {
    console.log('Message sauvegardé dans Supabase :', data);
  }
});

// Lancer le client
client.initialize();

