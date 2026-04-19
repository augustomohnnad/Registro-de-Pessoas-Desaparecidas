class StorageService {
    constructor(supabaseClient) {
        this.supabase = supabaseClient; // Injeção do cliente configurado acima
    }

    /**
     * @param {Object} file - Objeto de arquivo vindo do Multer (req.file)
     * @returns {Promise<string>} - Retorna a URL pública da imagem
     */
    async uploadImage(file) {
        try {
            // Geramos um nome único usando timestamp para evitar que fotos com o mesmo nome se sobrescrevam
            const fileName = `${Date.now()}-${file.originalname}`;
            const filePath = `${fileName}`;

            // 1. Fazemos o upload para o Bucket 'avatars' (que criamos no painel do Supabase)
            const { data, error } = await this.supabase.storage
                .from('img_person')
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false // Não sobrescreve arquivos existentes
                });

            if (error) {
                throw new Error(`Falha no upload para o Storage: ${error.message}`);
            }

            // 2. Solicitamos a URL pública do arquivo que acabamos de subir
            const { data: { publicUrl } } = this.supabase.storage
                .from('img_person')
                .getPublicUrl(filePath);

            return publicUrl;

        } catch (error) {
            console.error("[STORAGE SERVICE ERROR]:", error.message);
            throw error; // Repassamos o erro para o Controller tratar
        }
    }
}

module.exports = StorageService;