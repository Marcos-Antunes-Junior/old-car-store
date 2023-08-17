const pool = require("../database/")

/* ***************************
 *  Get all inventory data
 * ************************** */
async function getInventory(){
    return await pool.query("SELECT * FROM public.inventory")
}


module.exports = {getInventory}