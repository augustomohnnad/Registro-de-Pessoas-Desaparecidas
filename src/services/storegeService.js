class StorageService {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
    }

    /**
     * @param {Object} file - Objeto de arquivo vindo do Multer (req.file)
     * @returns {Promise<{publicUrl: string, filePath: string}>} - Retorna a URL e o caminho
     */
     uploadImage = async(file) => {
        try {
            
        
            // Geramos um nome único usando timestamp para evitar que fotos com o mesmo nome se sobrescrevam
            const fileName = `${Date.now()}-${file.originalname}`;
            const filePath = `${fileName}`;

            // 1. Fazemos o upload para o Bucket (que criamos no painel do Supabase)
            const { data, error } = await this.supabase.storage
                .from('VaiNaWeb')
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false // Não sobrescreve arquivos existentes
                });

            if (error) {
                throw new Error(`Falha no upload para o Storage: ${error.message}`);
            }

            // 2. Solicitamos a URL pública do arquivo que acabamos de subir
            const { data: { publicUrl } } = this.supabase.storage
                .from('VaiNaWeb')
                .getPublicUrl(filePath);

            return { publicUrl, filePath };;

        } catch (error) {
            console.error("[STORAGE SERVICE ERROR]:", error.message);
            throw error; // Repassamos o erro para o Controller tratar
        }
    }

    /**
     * @param {string} filePath - O caminho do arquivo dentro do bucket
     */

    removeImage = async (filePath) => {
        try {
            const {error} = await this.supabase.storage
            .from('VaiNaWeb')
            .remove([filePath])

        } catch {
            console.error(`[STORAGE ERROR]: Não foi possível remover o arquivo ${filePath}:, error.message`)
        }
        
    }
}

module.exports = StorageService;