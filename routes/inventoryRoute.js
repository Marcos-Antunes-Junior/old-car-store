// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route to build inventory
router.get("/cars/", invController.buildByInventory);

// Route to build inventory by id
router.get("/detail/:invId", (invController.buildInventoryByID))

module.exports = router;