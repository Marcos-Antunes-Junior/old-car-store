// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory
router.get("/cars/", utilities.handleErrors(invController.buildByInventory));

// Route to build inventory by id
router.get("/detail/:invId", utilities.handleErrors(invController.buildInventoryByID))

module.exports = router;