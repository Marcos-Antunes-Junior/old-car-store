/* ******************************************
 * This is the application server
 * ******************************************/

// Require statements
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")

/* ******************************************
 * Routes
 * ***************************************** */
app.use(static)


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
