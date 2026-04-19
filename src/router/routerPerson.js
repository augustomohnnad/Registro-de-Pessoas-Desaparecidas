const express = require("express");

module.exports = (controller) => {
    const router = express.Router()

    router.post("/", (req, res) => (controller.registerMissing(req, res)))
    router.get("/", (req, res) => (controller.everyonePerson(req, res)))
    
    return router
}