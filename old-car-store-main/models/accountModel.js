const pool = require("../database/")


/* ***************************
 *  Create account - Sign Up
 * ************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try{
        const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
        return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
        return error.message
    }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
    try {
        const sql = "SELECT * FROM account WHERE account_email = $1"
        const email = await pool.query(sql, [account_email])
        return email.rowCount
    } catch (error) {
        return error.message
    }
}

/* **********************
 * Return account data using email address
 * ********************* */
async function getAccountByEmail (account_email) {
    try {
        const result = await pool.query('SELECT * FROM account WHERE account_email = $1', [account_email])
        return result.rows[0]
    } catch (error) {
        return new Error("No matching email found")
    }
}

/* **********************
 * Edit Account
 * ********************* */
async function editAccount(account_firstname, account_lastname, account_email, account_id) {
    try {
        const sql = "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *"
        return await pool.query(sql, [account_firstname, account_lastname, account_email, account_id])
    } catch (error) {
        console.error("model error: " + error)
    }
}

/* *****************************
* Get account data by Id
* ***************************** */
async function getAccountByID (account_id){
    try {
      const result = await pool.query('SELECT * FROM public.account WHERE account_id=$1',
      [account_id]
      )
      return result.rows
    } catch (error) {
      console.error("getaccountbyid error " + error)
    }
  
  }

 /* *****************************
* Change Password
* ***************************** */
async function changePassword(account_password, account_id) {
    try {
        const sql = "UPDATE account SET account_password = $1 WHERE account_id = $2 RETURNING *"
        return await pool.query(sql, [account_password, account_id])
    } catch (error) {
        console.error("model error: " + error)
    }
}

 /* *****************************
* Delete account by ID
* ***************************** */
async function deleteByID(account_id) {
    try {
        const sql = "DELETE FROM account WHERE account_id = $1"
        const data = await pool.query(sql, [account_id])
        return data

    } catch (error) {
        new Error("Delete account error")
    }
}


module.exports = {registerAccount, checkExistingEmail, getAccountByEmail, editAccount, getAccountByID, changePassword, deleteByID}