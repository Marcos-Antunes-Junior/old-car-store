const express = require("express")
const router = new express.Router()
const accController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/accountValidation")

// Route to Sign In page
router.get("/login/", utilities.handleErrors(accController.buildLoginView))

// Route to Sign Up page
router.get("/signup/", utilities.handleErrors(accController.buildRegisterView))

// Route to logout process
router.get("/logout", utilities.handleErrors(accController.logoutProcess))




// Route to process 
router.post("/signup/", regValidate.registrationRules(), regValidate.checkRegData, utilities.handleErrors(accController.registerAccount))

// Test Login Route
router.post("/login", regValidate.loginRules(), regValidate.checkLoginData, utilities.handleErrors(accController.accountLogin))


module.exports = router;