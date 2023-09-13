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
const accountRoute = require("./routes/accountRoute")
const utilities = require("./utilities/")
const session = require("express-session")
const pool = require('./database/')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")





/* ***********************
 * Middleware
 * ************************/
app.use(session({
    store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,    
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: 'sessionId',
}))




// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
    res.locals.messages = require('express-messages') (req, res)
    next()
})


// Body-parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Cookie Parser
app.use(cookieParser())
// Check JWT Token
app.use(utilities.checkJWTToken)



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

//Account Route
app.use("/account", accountRoute)



// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
    next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})



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




/* ******************************************
 * Local server information (values from .env (enviroment) file)
 * ***************************************** */

const host = process.env.HOST
const port = process.env.PORT


/* ***********************
* Log statement to confirm server operation
* *********************** */

app.listen(port, () => {
console.log(`app listening on ${host}:${port}`)
})
