const { openDB } = require("../database/config/configDatabase");
const PersonModel = require("../database/model/modelPerson");
const ControllerPerson = require("../controller/controllerPerson");
const routerPerson = require("../router/routerPerson");


const supabase = require("../infra/configSupeBase");
const SupabaseStorageService = require("../services/storegeService"); 

const personRefactoring = async (app) => {
    try {
        const db = await openDB();
        
        // 1. Instanciamos o Model (SQLite)
        const dataModel = new PersonModel(db);
        await dataModel.createTable();

        // 2. Instanciamos o Service de Imagem (Supabase)
        // Passamos o cliente do supabase via injeção
        const storageService = new SupabaseStorageService(supabase);

        // 3. Injetamos AMBOS no Controller
        // Agora o controller tem poder de banco (SQLite) e de nuvem (Supabase)
        const controller = new ControllerPerson(dataModel, storageService);
    
        // 4. Passamos o controller para as rotas
        app.use("/api/missingPerson", routerPerson(controller));
        
        console.log("[MODULE] Person Module (com Storage) injetado e pronto.");
    } catch (e) {
        console.error(`[ERROR] Falha ao inicializar Person Module: ${e}` );
        throw e;
    }
};

module.exports = personRefactoring;