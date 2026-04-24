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
                status TEXT DEFAULT "DESAPARECIDO"
            ) 
        `)

        await this.modelPerson.exec(sql)
    }

    insertPerson = async (name, cpf,  age, gender, last_location, date_disappearance, physical_characteristic, photo_url, status) => {
        const sql = (`
            INSERT INTO tb_disappearance(
                name,
                cpf,
                age,
                gender,
                last_location,
                date_disappearance,
                physical_characteristic,
                photo_url,
                status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)

        return await this.modelPerson.run(sql, [name, cpf,  age, gender, last_location, date_disappearance, physical_characteristic, photo_url, status])

    }

    getAllPerson = async () => {
        const sql = (`
            SELECT *FROM tb_disappearance
        `)

        return await this.modelPerson.all(sql)
    }

    getSinglePerson = async (id) => {
        const sql = (`
            SELECT FROM tb_disappearance
            WHERE id = ?
        `)

        return await this.modelPerson.get(sql, [id])
    }

    updatePerson = async (name, last_location, photo_url, status, id) => {
        const sql = (`
            UPDATE tb_disappearance
            SET name = ?,
                last_location = ?,
                photo_url = ?,
                status = ?
            WHERE id = ?
        `)

        return await this.modelPerson.run(sql, [name, last_location, photo_url, status, id])

    }

    deletePerson = async (id) => {
        const sql = (`
            DELETE FROM tb_disappearance
            WHERE id = ?
        `)

        return await this.modelPerson(sql, [id])
    }

}

module.exports = PersonModel