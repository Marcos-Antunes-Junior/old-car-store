const invModel = require("../models/inventoryModel")
const cartModel = require("../models/cartModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* **************************************
* Build the inventory view (cars)
* ************************************ */
Util.buildInventoryGrid = async function(data, account, account_id) {
    let grid
    grid = '<div class="container py-5">'
    grid += '<div class="row">'
    if(data.length > 0 ){
    data.forEach(vehicle => {
    grid += '<div class="col-lg-3 col-md-12 mb-4">'
    grid += '<div class="card">'
    grid += '<a href="../../inv/detail/'+vehicle.inv_id+'" title="View ' + vehicle.inv_model+' details" class="text-decoration-none text-dark">'
    grid += '<img src="'+ vehicle.inv_image +'" alt="'+ vehicle.inv_model +'" class="card-img-top" />'
    grid += '<div class="card-body">'
    grid += '<h5 class="card-title text-truncate">'+ vehicle.inv_model +'</h5>'
    grid += '<div class="mt-1 mb-0 text-muted small">'
    grid += '<span>'+vehicle.inv_color+'</span>'
    grid += '</div>'
    grid += '<div class="d-flex flex-row">'
    grid += '<div class="text-danger mb-1 me-2">'
    grid += '<span class="fa fa-star checked"></span>'
    grid += '<span class="fa fa-star checked"></span>'
    grid += '<span class="fa fa-star checked"></span>'
    grid += '<span class="fa fa-star checked"></span>'
    grid += '<span class="fa fa-star checked"></span>'
    grid += '</div>'
    let x = 500
    grid += '<span>'+vehicle.inv_rating+'</span>'
    grid += '</div>'
    grid += '<p class="text-truncate mb-4 mb-md-0">' + vehicle.inv_description + '</p>'
    grid += '<div class="d-flex flex-row align-items-center mb-1">'
    grid += '<h4 class="mb-1 me-1">$'+ new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</h4>'
    let priceNumber = parseInt(vehicle.inv_price) + x
    grid += '<span class="text-danger"><s>$'+ new Intl.NumberFormat('en-US').format(priceNumber) +'</s></span>'
    grid += '</div>'
    grid += '<h6 class="text-success">Special offer</h6>'
    grid += '</div>'
    grid += '<div class="card-body border-top">'
    if(account){ 
    grid += '<form action="/inv/cart" method="post">'
    grid += `<input type="hidden" name="account_id" required value="${account_id}">`
    grid += `<input type="hidden" name="inv_id" required value="${vehicle.inv_id}">`
    grid += `<input type="hidden" name="inv_model" required value="${vehicle.inv_model}">`
    grid += `<input type="hidden" name="inv_year" required value="${vehicle.inv_year}">`
    grid += `<input type="hidden" name="inv_image" required value="${vehicle.inv_image}">`
    grid += `<input type="hidden" name="inv_price" required value="${vehicle.inv_price}">`
    grid += `<input type="hidden" name="inv_color" required value="${vehicle.inv_color}">`
    grid += `<input type="hidden" name="inv_rating" required value="${vehicle.inv_rating}">`
    grid += '<a class="btn btn-dark btn-sm me-2 text-light text-decoration-none" title="Click to see more" href="../../inv/detail/'+vehicle.inv_id+'" role="button">Details</a>'
    grid += '<button class="btn btn-outline-dark btn-sm me-2 text-decoration-none" title="Click to add to cart" type="submit">Add to cart</button>'
    grid += '</form>'
    } else { 
    grid += '<a class="btn btn-dark btn-sm me-2 text-light text-decoration-none" title="Click to see more" href="../../inv/detail/'+vehicle.inv_id+'" role="button">Details</a>'
    grid += '<a class="btn btn-outline-dark btn-sm me-2 text-decoration-none" title="Click to add to cart" href="/account/login" role="button">Add to cart</a>'
    }
    grid += '</div>'
    grid += '</a>'
    grid += '</div>'
    grid += '</div>'
})
   grid += '</div>'
   grid += '</div>'

    } else {
    grid = '<h3>Sorry, no matching vehicles could be found.</h3>'
    }
    return grid
}


/* **************************************
* Build the details view
* ************************************ */
Util.buildDetailsView = async function (data, account, account_id){
    let detailView
    detailView = '<section class="py-5">'
    if(data.length > 0){
    data.forEach(vehicle => {
    detailView += '<div class="container px-4 px-lg-5 my-5">'
    detailView += '<div class="row gx-4 gx-lg-5 align-items-center">'
    detailView += '<div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="'+ vehicle.inv_image +'" alt="'+ vehicle.inv_model +'"/></div>'
    detailView += '<div class="col-md-6">'
    detailView += '<div class="small mb-1">'+ vehicle.inv_year + ' - '+ vehicle.inv_color +'</div>'
    detailView += '<h1 class="display-5 fw-bolder">'+vehicle.inv_model+'</h1>'
    detailView += '<div class="fs-5 mb-5">'
    let x = 500
    let priceNumber = parseInt(vehicle.inv_price) + x
    detailView += '<span class="text-decoration-line-through text-danger">'+new Intl.NumberFormat('en-US').format(priceNumber)+'</span>'
    detailView += '<span class="text-success"> $'+ new Intl.NumberFormat('en-US').format(vehicle.inv_price) +'</span>'
    detailView += '</div>'
    detailView += '<p class="lead">'+vehicle.inv_description+'</p>'
    detailView += '<div class="d-flex">'
    if(account){
        detailView += '<form action="/inv/cart" method="post">'
        detailView += `<input type="hidden" name="account_id" required value="${account_id}">`
        detailView += `<input type="hidden" name="inv_id" required value="${vehicle.inv_id}">`
        detailView += `<input type="hidden" name="inv_model" required value="${vehicle.inv_model}">`
        detailView += `<input type="hidden" name="inv_year" required value="${vehicle.inv_year}">`
        detailView += `<input type="hidden" name="inv_image" required value="${vehicle.inv_image}">`
        detailView += `<input type="hidden" name="inv_price" required value="${vehicle.inv_price}">`
        detailView += `<input type="hidden" name="inv_color" required value="${vehicle.inv_color}">`
        detailView += `<input type="hidden" name="inv_rating" required value="${vehicle.inv_rating}">`
        detailView += '<button class="btn btn-outline-dark me-2 text-decoration-none" title="Click to add to cart" type="submit">'
        detailView += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">'
        detailView += '<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>'
        detailView += '</svg> '
        detailView += 'Add to cart</button>'
        detailView += '</form>'
        detailView += '<a class="btn btn-dark" href="#" role="button">'
        detailView += 'Quick buy now'
        detailView += '</a>'
    } else {
    detailView += '<a class="btn btn-outline-dark flex-shrink-0  me-2" href="/account/login" role="button">'
    detailView += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">'
    detailView += '<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>'
    detailView += '</svg> '
    detailView += ' Add to cart'
    detailView += '</a>'
    detailView += '<a class="btn btn-dark" href="/account/login" role="button">'
    detailView += 'Quick buy now'
    detailView += '</a>'
    }
    detailView += '</div>'
    detailView += '</div>'
    detailView += '</div>'
    detailView += '</div>'

    })
    detailView += '</section>'
} else {
    detailView = '<h3>Sorry, no matching vehicle could be found.</h3>'
}

return detailView
}


/* **************************************
* Build the cart view
* ************************************ */
Util.buildCartView = async function (data){
    let cartView
    cartView = '<div class="col-10">'
    cartView += '<div class="d-flex justify-content-between align-items-center mb-4">'
    cartView += '<h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>'
    cartView += '</div>'
    if(data.length > 0 ){
    data.forEach(vehicle => {
    cartView += '<div class="card rounded-3 mb-4">'   
    cartView += '<div class="card-body p-4">'
    cartView += '<div class="row d-flex justify-content-between align-items-center">'
    cartView += '<div class="col-md-2 col-lg-2 col-xl-2">'
    cartView += '<img class="img-fluid rounded-3" src="'+ vehicle.inv_image +'" alt="'+ vehicle.inv_model +'"/>'
    cartView += '</div>'
    cartView += '<div class="col-md-3 col-lg-3 col-xl-3">'
    cartView += `<p class="lead fw-normal mb-2">${vehicle.inv_model}</p>`
    cartView += `<p><span class="text-muted">Year: </span>${vehicle.inv_year} <span class="text-muted">Color: </span>${vehicle.inv_color}</p>`
    cartView += '</div>'
    cartView += '<div class="col-md-3 col-lg-3 col-xl-2 d-flex">'
    cartView += '<div class="text-danger mb-1 me-2">'
    cartView += '<span class="fa fa-star checked"></span>'
    cartView += '<span class="fa fa-star checked"></span>'
    cartView += '<span class="fa fa-star checked"></span>'
    cartView += '<span class="fa fa-star checked"></span>'
    cartView += '<span class="fa fa-star checked"></span>'
    cartView += '</div>'
    cartView += `<span>${vehicle.inv_rating}</span>`
    cartView += '</div>'
    let x = 500
    let priceNumber = parseInt(vehicle.inv_price) + x
    cartView += '<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">'
    cartView += '<span class="text-decoration-line-through text-danger">'+new Intl.NumberFormat('en-US').format(priceNumber)+'</span>'
    cartView += '<span class="text-success"> $'+ new Intl.NumberFormat('en-US').format(vehicle.inv_price) +'</span>'
    cartView += '</div>'
    cartView += '<div class="col-md-1 col-lg-1 col-xl-1 text-end">'
    cartView += '<form action="/inv/cart/delete" method="post">'
    cartView += '<input type="hidden" name="cart_id" class="form-control form-control-lg" required value="'+ vehicle.cart_id +'">'
    cartView += '<button class="text-danger" type="submit" style="border: none; background-color: #fff;"><i class="fa fa-trash fa-lg"></i></button>'
    cartView += '</form>'
    cartView += '</div>'
    cartView += '</div>'
    cartView += '</div>'
    cartView += '</div>'
    })
    } else {
    cartView = '<h3>You have 0 items in your cart.</h3>'
    }
    return cartView
}

/* **************************************
* Build cart number items
* ************************************ */
Util.cartNumber = async function (account_id) {
const data = await cartModel.getCartbyAccountID(account_id)
let numberOfItems = 0;
if(data.length > 0 ) {
data.forEach(vehicle => {
numberOfItems++;
})
return numberOfItems;
} else {
return numberOfItems;
}
}



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
    if (req.cookies.jwt) {
        jwt.verify(
        req.cookies.jwt,
        process.env.ACCESS_TOKEN_SECRET,
        function (err, accountData) {
        if (err) {
        req.flash("Please log in")
        res.clearCookie("jwt")
        return res.redirect("/account/login")
        }
        res.locals.accountData = accountData
        res.locals.loggedin = 1
        next()
        }
        )
    } else {
        next()
    }
}

module.exports = Util