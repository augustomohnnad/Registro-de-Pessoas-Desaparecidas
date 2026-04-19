class PersonModel {
    constructor(modelPerson) {
        this.modelPerson = modelPerson
    }

    createTable = async () => {
        const sql = (`
            CREATE TABLE IF NOT EXISTS tb_disappearance(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT CHECK(length(name) <= 50),
                cpf TEXT UNIQUE,
                age INTEGER,
                gender TEXT,
                last_location TEXT,
                date_disappearance TEXT,
                physical_characteristic TEXT,
                photo_url TEXT,
                status TEXT DEFAULT "Desaparecido"
            ) 
        `)

        await this.modelPerson.exec(sql)
    }

    insertPerson = async (name, cpf,  age, gender, last_location, date_disappearance, physical_characteristic, photo_url) => {
        const sql = (`
            INSERT INTO tb_disappearance(
                name,
                cpf,
                age,
                gender,
                last_location,
                date_disappearance,
                physical_characteristic,
                photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `)

        return await this.modelPerson.run(sql, [name, cpf,  age, gender, last_location, date_disappearance, physical_characteristic, photo_url])

    }

    getAllPerson = async () => {
        const sql = (`
            SELECT *FROM tb_disappearance
        `)

        return await this.modelPerson.all(sql)
    }

}

module.exports = PersonModel