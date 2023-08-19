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

/* ***************************
 *  Build inventory details view
 * ************************** */
invCont.buildInventoryByID = async function (req, res, next) {
    const inv_id = req.params.invId
    const data = await invModel.getInventoryByID(inv_id)
    //const detailView = await utilities.buildDetailsView(data)
    const invYear = data[0].inv_year
    const model = data[0].inv_model
    res.render("./inventory/detail", {
        title: invYear + " " + model,
        //detailView,
    })
}

module.exports = invCont