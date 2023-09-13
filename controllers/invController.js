const invModel = require("../models/inventoryModel")
const cartModel = require("../models/cartModel")
const utilities = require("../utilities/")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const invCont = {}

/* ***************************
 *  Build inventory view
 * ************************** */
invCont.buildByInventory = async function (req, res, next) {
    const data = await invModel.getInventory()
    const account = res.locals.accountData
    if(account) {
        const account_id = res.locals.accountData.account_id
        const grid = await utilities.buildInventoryGrid(data, account, account_id)
        res.render("./inventory/cars", {
            title: "Our cars",
            grid,
        })
    } else {
        const grid = await utilities.buildInventoryGrid(data, account)
        res.render("./inventory/cars", {
            title: "Our cars",
            grid,
        })
    }
  
}

/* ***************************
 *  Build inventory details view
 * ************************** */
invCont.buildInventoryByID = async function (req, res, next) {
    const inv_id = req.params.invId
    const account = res.locals.accountData
    const data = await invModel.getInventoryByID(inv_id)
    const invYear = data[0].inv_year
    const model = data[0].inv_model
    if(account){
    const account_id = res.locals.accountData.account_id
    const detailView = await utilities.buildDetailsView(data, account, account_id)  
    res.render("./inventory/detail", {
        title: invYear + " " + model,
        detailView,
    })   
    } else {
    const detailView = await utilities.buildDetailsView(data, account) 
    res.render("./inventory/detail", {
        title: invYear + " " + model,
        detailView,
    })     
    }
    
}

/* ***************************
 * Process adding cart
 * ************************** */
invCont.processCart = async function (req, res){
const {account_id, inv_id, inv_model, inv_year, inv_image, inv_price, inv_color, inv_rating} = req.body
const addToCart = cartModel.insertCartData(account_id, inv_id, inv_model, inv_year, inv_image, inv_price, inv_color, inv_rating)
if(addToCart){
res.status(201).redirect("/inv/cart")   
} else {
res.status(500).redirect("/inv/cars")
}

}

/* ***************************
 * Cart View
 * ************************** */
invCont.cartView = async function (req, res, next){
const account = res.locals.accountData.account_id
const data = await cartModel.getCartbyAccountID(account)
const cartView = await utilities.buildCartView(data)
res.render("./inventory/cart", {
title: "Cart",
cartView,   
})    

}


module.exports = invCont