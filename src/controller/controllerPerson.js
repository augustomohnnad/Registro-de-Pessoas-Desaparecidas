class ControllerPerson {
    constructor(person, storageService) {
        this.person = person;
        this.storageService = storageService;
    }

    registerMissing = async (req, res) => {
        
        try {
            const {name, cpf,  age, gender, last_location, date_disappearance, physical_characteristic, status} = req.body

            const file = req.file

            if(!req.body.cpf || req.body.cpf.length !== 11) {
                throw new Error(`${name} com CPF vazio ou menor que 11 digitos.`)
            } 

            //Upload da Imagem
            let uploadedFilePath = null
            const uploadResult = await this.storageService.uploadImage(file);
            uploadedFilePath = uploadResult.path;
            const photo_url = uploadResult.publicUrl;

            await this.person.insertPerson(name, cpf,  age, gender, last_location, date_disappearance, physical_characteristic, photo_url, status)

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