const utilities = require(".")
const { body, validationResult } = require("express-validator")
const accountModel = require("../models/accountModel")
const validate = {}

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */

 validate.registrationRules = () => {
    return [
    body("account_firstname")
    .trim()
    .isLength({ min: 1})
    .withMessage("Please, provide a first name."),

    body("account_lastname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Please provide a last name."),

    body("account_email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email is required")
    .custom(async (account_email) => {
        const emailExists = await accountModel.checkExistingEmail(account_email)
        if(emailExists) {
          throw new Error("Email exists. Please, log in or use different email")
        }
    }),

    body("account_password")
    .trim()
    .isStrongPassword({
        maxLength: 16,
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    .withMessage("Password does not meet requirements."),
    ]
 }

 /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("account/signup", {
            errors,
            title: "Sign Up",
            account_firstname,
            account_lastname,
            account_email,
        })
      return 
    }
    next()
}


/*  **********************************
 *  Login Data validation rules
 * ********************************* */
validate.loginRules = () => {
    return [
        body('account_email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email is required.")
        .custom(async (account_email) => {
          const emailExists = await accountModel.checkExistingEmail(account_email)
          if(!emailExists) {
            throw new Error("Wrong email or password.")
          }
        }),
    ]
}

 /* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
    const {account_email} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render("account/login", {
        errors,
        title: "Login",
        account_email,  
        })
        return
    }
    next()

}



/*  **********************************
 *  Edit Data Validation Rules
 * ********************************* */

validate.editRules = () => {
    return [
    body("account_firstname")
    .trim()
    .isLength({ min: 1})
    .withMessage("Please, provide a first name."),

    body("account_lastname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Please provide a last name."),

    body("account_email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email is required")
    .custom(async (account_email, {req}) => {
        const getAccount = await accountModel.getAccountByID(req.body.account_id)
        const emailExists = await accountModel.checkExistingEmail(account_email)
        if(getAccount.account_id != emailExists.account_id) {
            throw new Error("Email exists. Please, use different email")
          
        }
    }),
    ]
 }

  /* ******************************
 * Check data and return errors or continue to edit
 * ***************************** */
  validate.checkEditData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email, account_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("./account/edit", {
            errors,
            title: "Edit Account",
            account_firstname,
            account_lastname,
            account_email,
            account_id,
        })
      return 
    }
    next()
}


/*  **********************************
 *  Change Password Validation Rules
 * ********************************* */
validate.changePassRules = () => {
    return [
    //account id is required and must be an integer
    body("account_id")
    .trim()
    .isInt(),

    body("account_password")
    .trim()
    .isStrongPassword({
        maxLength: 16,
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    .withMessage("Password does not meet requirements."),

    ]
 }


  /* ******************************
 * Check data and return errors or continue to change password
 * ***************************** */
  validate.checkChangePass = async (req, res, next) => {
    const { account_id} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("./account/change", {
            errors,
            title: "Change Password",
            account_id,
        })
      return 
    }
    next()
}


/*  **********************************
 *  Delete Account Validation Rules
 * ********************************* */
validate.deleteAccountRules = () => {
    return [
    //account id is required and must be an integer
    body("account_id")
    .trim()
    .isInt()
    .withMessage("Error! Please, try again later."),
    ]
 }


   /* ******************************
 * Check data and return errors or continue to delete account
 * ***************************** */
   validate.checkDeleteAccount = async (req, res, next) => {
    const { account_id} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("./account/delete", {
            errors,
            title: "Delete Account",
            account_id,
        })
      return 
    }
    next()
}




module.exports = validate
