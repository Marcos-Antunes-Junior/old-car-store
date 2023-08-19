const invModel = require("../models/inventoryModel")
const Util = {}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildInventoryGrid = async function(data) {
    let grid
    grid = '<div class="container py-5">'
    grid += '<div class="row">'
    if(data.length > 0 ){
    data.forEach(vehicle => {
    grid += '<div class="col-lg-3 col-md-12 mb-4">'
    grid += '<div class="card">'
    grid += '<a href="#" class="text-decoration-none text-dark">'
    grid += '<img src="'+ vehicle.inv_image +'" alt="'+ vehicle.inv_model +'" class="card-img-top" />'
    grid += '<div class="card-body">'
    grid += '<h5 class="card-title">'+ vehicle.inv_model +'</h5>'
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
    let x = Math.floor((Math.random() * 500) + 1);
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
    grid += '<div class="card-body border-top"">'
    grid += '<a class="btn btn-dark btn-sm me-2 text-light text-decoration-none" title="Click to see more" href="#" role="button">Details</a>'
    grid += '<a class="btn btn-outline-dark btn-sm me-2 text-decoration-none" title="Click to add to cart" href="#" role="button">Add to cart</a>'
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



module.exports = Util