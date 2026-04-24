const express = require("express");
const multer = require('multer');



module.exports = (controller) => {
    const router = express.Router()
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    router.post("/", upload.single('photo_url'), (req, res) => (controller.registerMissing(req, res)))
    router.get("/", (req, res) => (controller.everyonePerson(req, res)))
    router.get("/:id", (req,res) => (controller.getPerson(req, res)))
    router.put("/:id", (req,res) => (controller.editPerson(req, res)))
    router.delete("/:id", (req,res) => (controller.deletPerson(req, res)))
    
    return router
}