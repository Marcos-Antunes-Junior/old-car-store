const utilities = require(".")
const { body, validationResult } = require("express-validator")
const accountModel = require("../models/accountModel")
const cartModel = require("../models/cartModel")
const validate = {}


/*  **********************************
 *  Cart Validation Rules
 * ********************************* */
validate.cartRules = () => {
return [
    body("account_id")
    .trim()
    .isLength({ min: 1})
    .withMessage("Error. Please, try again later"),

    body("inv_id")
    .trim()
    .isLength({ min: 1})
    .withMessage("Error. Please, try again later"),

    body("inv_model")
    .trim()
    .isLength({ min: 1})
    .withMessage("Error. Please, try again later"),

    body("inv_year")
    .trim()
    .isLength({ min: 1})
    .withMessage("Error. Please, try again later"),

    body("inv_image")
    .trim()
    .isLength({ min: 1})
    .withMessage("Error. Please, try again later"),

    body("inv_price")
    .trim()
    .isLength({ min: 1})
    .withMessage("Error. Please, try again later"),

    body("inv_color")
    .trim()
    .isLength({ min: 1})
    .withMessage("Error. Please, try again later")
]
}


/*  **********************************
 *  check data and return errors or continue cart process
 * ********************************* */
validate.checkDataCart = async (req, res, next) => {
    const {account_id, inv_id, inv_model, inv_year, inv_image, inv_price, inv_color, inv_rating} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("inv/cars", {
            errors,
            title: "Our cars",
            account_id, 
            inv_id, 
            inv_model, 
            inv_year, 
            inv_image, 
            inv_price, 
            inv_color,
            inv_rating
           
        })
      return 
    }
    next()
}

module.exports = validate
