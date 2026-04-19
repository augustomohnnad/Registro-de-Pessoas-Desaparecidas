class ControllerPerson {
    constructor(person, storageService) {
        this.person = person;
        this.storageService = storageService;
    }

    registerMissing = async (req, res) => {
        try {
            const {name, cpf,  age, gender, last_location, date_disappearance, physical_characteristic} = req.body

            // O Multer deixará o arquivo aqui se ele for enviado
            const file = req.file;

            if(!req.body.cpf || req.body.cpf.length !== 11) {
                throw new Error(`${name} com CPF vazio ou menor que 11 digitos.`)
            }

            // 2. Lógica de Imagem (Regra de Negócio)
            let photoUrl = null
            if (file) {
                // Chamamos o serviço de storage injetado
                photoUrl = await this.storageService.uploadImage(file);
            }
            console.log("DEBUG: A URL que vou salvar é:", photoUrl)
            await this.person.insertPerson(name, cpf,  age, gender, last_location, date_disappearance, physical_characteristic)

            return res.status(201).send(`${name}, Registered successfully!`)

        } catch (e) {
            if(e.message.includes("UNIQUE")) {
                console.error(`[REGISTRATION ERROR]: ${e.message}`)
                return res.status(400).json({
                    erro: true, 
                    mensagem: e.message
                })
            } 

            console.error(`[SERVER ERROR]: ${e.message}`)
            return res.status(500).json({
                erro: true, 
                mensagem: e.message
            })
        }    

    }

    everyonePerson = async (req, res) => {
        try {
            const listAll = await this.person.getAllPerson()
            if(!(listAll)) {
                throw new Error("Not data found")
            }

            return res.status(200).json(listAll)

        } catch (e) {
             console.error(`[SERVER ERROR]: ${e.message}`)
            return res.status(500).json({
                erro: true, 
                mensagem: e.message
            })
        }
    }
}

module.exports = ControllerPerson