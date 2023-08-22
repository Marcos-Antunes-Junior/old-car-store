/* ******************************************
 * This is the application server
 * ******************************************/

// Require statements
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/")


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root



/* ******************************************
 * Routes
 * ***************************************** */
app.use(static)

// Index route
app.get("/", utilities.handleErrors(function(req, res) {
res.render("index", {title: "Home"})    
}))

//Inventory Routes
app.use("/inv", inventoryRoute)

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
    next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})



/* ******************************************
 * Local server information (values from .env (enviroment) file)
 * ***************************************** */

const host = process.env.HOST
const port = process.env.PORT


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
console.error(`Error at: "${req.originalUrl}": ${err.message}`)
if(err.status == 404){message = err.message} else {message = 'Wrong way! Maybe try a different route?'}
res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
})
})


/* ***********************
* Log statement to confirm server operation
* *********************** */

app.listen(port, () => {
console.log(`app listening on ${host}:${port}`)
})
