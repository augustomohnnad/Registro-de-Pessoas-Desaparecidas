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
            
        
            // nome único usado timestamp para evitar que fotos com o mesmo nome se sobrescrevam
            const fileName = `${Date.now()}-${file.originalname}`;
            const filePath = `${fileName}`;

            //Faz o upload para o Bucket 
            const { data, error } = await this.supabase.storage
                .from('VaiNaWeb')
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false // Não sobrescreve arquivos existentes
                });

            if (error) {
                throw new Error(`Falha no upload para o Storage: ${error.message}`);
            }

            //Solicitaa URL pública do arquivo que esta na Nuvem
            const { data: { publicUrl } } = this.supabase.storage
                .from('VaiNaWeb')
                .getPublicUrl(filePath);

            return { publicUrl, filePath };;

        } catch (error) {
            console.error("[STORAGE SERVICE ERROR]:", error.message);
            throw error; // Repassa o erro para o Controller tratar
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