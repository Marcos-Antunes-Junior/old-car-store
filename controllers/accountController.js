const accModel = require("../models/accountModel")
const utilities = require("../utilities/")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()



/* ***************************
 *  Build Login View
 * ************************** */
async function buildLoginView (req, res, next) {

res.render("./account/login", {
title: "Login",
errors: null,
})
}


/* ***************************
 *  Build SignUp View
 * ************************** */
async function buildRegisterView(req, res, next) {
    res.render("./account/signup", {
        title: "Sign Up",
        errors: null,
    })
}


/* ***************************
 *  Process registration - Sign up
 * ************************** */
async function registerAccount(req, res){
    const { account_firstname, account_lastname, account_email, account_password } = req.body
   // Hash the password before storing
   let hashedPassword
   try {
    // regular password and cost (salt is generadted automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
   } catch (error) {
    req.flash("bad-notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/signup", {
        title: "Sign Up",
        errors: null,
    })
   }

    const regResult = await accModel.registerAccount(account_firstname, account_lastname, account_email, hashedPassword)

    if (regResult) {
        req.flash("notice", `Congratulations, you\'re registered ${account_firstname}. Please log in.`)
        res.status(201).redirect("/account/login")
    } else {
        req.flash("bad-notice", "Sorry, the registration failed.")
        res.status(501).redirect("/account/signup")
    }
}


/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
    const { account_email, account_password } = req.body
    const accountData = await accModel.getAccountByEmail(account_email)
    if(!accountData) {
        req.flash("bad-notice", "Please, check your credentials and try again")
        res.status(400).render("account/login", {
            title: "Login",
            errors:null,
            account_email,
        })
    return
    }
    try {
     if (await bcrypt.compare(account_password, accountData.account_password)) {
     delete accountData.account_password
     const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
     res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
     return res.redirect("/")
     } else {
     req.flash("bad-notice", "Wrong email or password.")
     res.status(401).render("account/login", {
        title: "Login",
        errors: null,
     })
     }
    } catch (error) {
        return new Error('Access Forbidden')  
    }
}

/* ****************************************
 *  Logout Process
 * ************************************ */
async function logoutProcess(req, res, next) {
    res.clearCookie("jwt");
    return res.redirect("/")
}

module.exports = {buildLoginView, buildRegisterView, registerAccount, accountLogin, logoutProcess}
