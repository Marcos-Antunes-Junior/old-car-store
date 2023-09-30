const pool = require("../database/")

/* ***************************
 *  Insert data into cart table
 * ************************** */
async function insertCartData(account_id, inv_id, inv_model, inv_year, inv_image, inv_price, inv_color, inv_rating) {
    try {
        const sql = "INSERT INTO cart (account_id, inv_id, inv_model, inv_year, inv_image, inv_price, inv_color, inv_rating) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
        return await pool.query(sql, [account_id, inv_id, inv_model, inv_year, inv_image, inv_price, inv_color, inv_rating])
    } catch (error) {
        return error.message
    }
}

/* ***************************
 * Get cart data by account ID
 * ************************** */
async function getCartbyAccountID(account_id) {
    try {
        const data = await pool.query("SELECT * FROM public.cart where account_id = $1", [account_id])
        return data.rows
    } catch (error) {
        console.error("getCartbyAccountID error: " + error)
    }
}

/* ***************************
 * Delete cart item by id
 * ************************** */
async function deleteCartItemByID(cart_id){
    try {
        const sql = "DELETE FROM public.cart WHERE cart_id = $1"
        const data = await pool.query(sql, [cart_id])
        return data
    } catch (error) {
        console.error("deleteCartItemByID:" + error)
    }
}

module.exports = { insertCartData, getCartbyAccountID, deleteCartItemByID }