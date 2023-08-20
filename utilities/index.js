const invModel = require("../models/inventoryModel")
const Util = {}

/* **************************************
* Build the inventory view (cars)
* ************************************ */
Util.buildInventoryGrid = async function(data) {
    let grid
    grid = '<div class="container py-5">'
    grid += '<div class="row">'
    if(data.length > 0 ){
    data.forEach(vehicle => {
    grid += '<div class="col-lg-3 col-md-12 mb-4">'
    grid += '<div class="card">'
    grid += '<a href="../../inv/detail/'+vehicle.inv_id+'"title="View ' + vehicle.inv_model+' details" class="text-decoration-none text-dark">'
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
    grid += '<div class="card-body border-top"">'
    grid += '<a class="btn btn-dark btn-sm me-2 text-light text-decoration-none" title="Click to see more" href="../../inv/detail/'+vehicle.inv_id+'" role="button">Details</a>'
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


/* **************************************
* Build the details view
* ************************************ */
Util.buildDetailsView = async function (data){
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
    detailView += '<button class="btn btn-outline-dark flex-shrink-0  me-2" type="button">'
    detailView += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">'
    detailView += '<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>'
    detailView += '</svg> '
    detailView += ' Add to cart'
    detailView += '</button>'
    detailView += '<button class="btn btn-dark" type="button">'
    detailView += 'Quick buy now'
    detailView += '</button>'
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



module.exports = Util