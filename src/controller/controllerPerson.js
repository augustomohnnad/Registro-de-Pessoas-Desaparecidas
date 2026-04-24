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

            return res.status(201).json(`${name}, Registered successfully!`)

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

    getPerson = async (req, res) => {
        try {
            const {id} = req.body
            const getId = await this.ControllerPerson.getSinglePerson(Number(id))

            if(!getId) {
                throw new Error("Person Not foud");
            }

            return res.status(200).json(getId)

        } catch (e) {
            console.erro(`[SEARCH ERROR], ${e.message}`)
            return res.status(404).json({
                error: true,
                mensagem: e.message
            })

            console.error(`[SERVER ERROR]: ${e.message}`)
            return res.status(500).json({
                erro: true, 
                mensagem: e.message
            })
        }
    }

    editPerson = async (req, res) => {
        try {
            const {name, last_location, status, id} = req.body
            const checkFile = req.file
            const checkId = await this.ControllerPerson.getSinglePerson(Number(id))

            if(!checkId) {
                throw new Error("Person Not foud");
            }

            await this.ControllerPerson.updatePerson(name, last_location, status, id)
            return res.status(200).json(`${name} updated of sucessefull!`)

        } catch(e) {
            console.erro(`[SEARCH ERROR], ${e.message}`)
            return res.status(404).json({
                error: true,
                mensagem: e.message
            })

            console.error(`[SERVER ERROR]: ${e.message}`)
            return res.status(500).json({
                erro: true, 
                mensagem: e.message
            })
        } 
    }

    deletPerson = async (req, res) => {
        try {
            const {id} = req.body
            const checkPerson = await this.ControllerPerson.getSinglePerson(Number(id))

             if(!checkPerson) {
                throw new Error("Person Not foud");
            }

            await this.ControllerPerson.deletePerson(name, last_location, status, id)
            return res.status(200).json(`${name} delete of sucessefull!`)

        } catch(e) {
            console.erro(`[SEARCH ERROR], ${e.message}`)
            return res.status(404).json({
                error: true,
                mensagem: e.message
            })

            console.error(`[SERVER ERROR]: ${e.message}`)
            return res.status(500).json({
                erro: true, 
                mensagem: e.message
            })
        } 
        
    }
}

module.exports = ControllerPerson