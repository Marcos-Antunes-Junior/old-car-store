// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/inventoryValidation")

// Route to build inventory
router.get("/cars/", utilities.handleErrors(invController.buildByInventory));

// Route to build inventory by id
router.get("/detail/:invId", utilities.handleErrors(invController.buildInventoryByID))

// Route to get cart view
router.get("/cart/", utilities.handleErrors(invController.cartView))

// Route to process cart
router.post("/cart/", regValidate.cartRules(), regValidate.checkDataCart, utilities.handleErrors(invController.processCart))

module.exports = router;