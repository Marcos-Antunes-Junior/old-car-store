const invModel = require("../models/inventoryModel")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory view
 * ************************** */
invCont.buildByInventory = async function (req, res, next) {
    const data = await invModel.getInventory()
    const grid = await utilities.buildInventoryGrid(data)
    res.render("./inventory/cars", {
        title: "Our cars",
        grid,
    })
}

module.exports = invCont