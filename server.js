/* ******************************************
 * This is the application server
 * ******************************************/

// Require statements
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")


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
app.get("/", function(req, res) {
res.render("index", {title: "Home"})    
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
