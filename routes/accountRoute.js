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

// Route to edit account
router.get("/edit/", utilities.handleErrors(accController.editAccountView))

// Route to edit password
router.get("/change/", utilities.handleErrors(accController.changePassword))

// Route to process 
router.post("/signup/", regValidate.registrationRules(), regValidate.checkRegData, utilities.handleErrors(accController.registerAccount))

// Login Route
router.post("/login", regValidate.loginRules(), regValidate.checkLoginData, utilities.handleErrors(accController.accountLogin))

// Process edit account
router.post("/update", regValidate.editRules(), regValidate.checkEditData, utilities.handleErrors(accController.processEditAccount))

// Process password update
router.post("/updatePass", regValidate.changePassRules(), regValidate.checkChangePass, utilities.handleErrors(accController.processPassword))

module.exports = router;