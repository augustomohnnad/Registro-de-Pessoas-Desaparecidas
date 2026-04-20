const express = require("express");
const multer = require('multer');



module.exports = (controller) => {
    const router = express.Router()
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    router.post("/", upload.single('photo_url'), (req, res) => (controller.registerMissing(req, res)))
    router.get("/", (req, res) => (controller.everyonePerson(req, res)))
    
    return router
}