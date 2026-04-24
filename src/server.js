const express = require("express");
const cors = require("cors")

const modulesPerson = require("./modules/modulesPerson")

const app = express()
app.use(cors())
app.use(express.json());



async function systemStart() {
    try {
        await modulesPerson(app);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor Rodando na porta http://127.0.0.1:${PORT}`)
        })
    } catch (e) {
        console.log("Servidor foi de base.")
    } 
}

systemStart()