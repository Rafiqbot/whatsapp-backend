const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Vérifie si les variables sont présentes
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase connecté');
} else {
  console.log('⚠️ Supabase non configuré. Le backend démarre sans Supabase.');
}

// Exemple de route pour tester
app.get('/', (req, res) => {
  res.send('Backend WhatsApp OK ✅');
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Serveur démarré sur le port ${port}`);
});



