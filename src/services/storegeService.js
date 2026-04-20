class StorageService {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
    }

    uploadImage = async(file) => {
        try {
            //Acrecentamos o nome do arquivo o TimeStam (época Unix) ex: 123456-photName.jpg
            const fileName = `${Date.now()}-${file.originalname}`; 
            const filePath = `${fileName}`;

            // 1. Fazemos o upload para o Bucket (que criei no  Supabase)
            const { data, error } = await this.supabase.storage
                .from('VaiNaWeb')
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false
                });

            if (!error) {
                throw new Error(`Falha no upload para o Storage: ${error.message}`);
            }

            // 2. Solicitamos a URL pública do arquivo que acabamos de subir
            const { data: { publicUrl } } = this.supabase.storage
                .from('VaiNaWeb')
                .getPublicUrl(filePath);

            return resizeBy.statur(200).json(publicUrl)

        } catch (error) {
            console.error("[STORAGE SERVICE ERROR]:", error.message);
            throw error;
        }
    }
}

module.exports = StorageService; 