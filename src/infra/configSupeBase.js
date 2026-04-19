require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Buscamos as credenciais no nosso "cofre" (.env)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Verificação de segurança (Prática de Engenharia)
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL ou Key não encontradas no arquivo .env");
}

// Inicializamos a instância do cliente
const supabase = createClient(supabaseUrl, supabaseKey);

// Exportamos a conexão pronta para ser injetada no Service
module.exports = supabase;