const utilities = require("../utilities/")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const baseController = {}

baseController.buildHome = async function(req, res){
const account = res.locals.accountData
if(account){
const account_id = res.locals.accountData.account_id
const cartNum = await utilities.cartNumber(account_id)
res.render("index", {title: "Home", cartNum,})
} else {
res.render("index", {title: "Home"})
}

}

module.exports = baseController