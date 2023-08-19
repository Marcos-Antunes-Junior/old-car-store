const pool = require("../database/")

/* ***************************
 *  Get all inventory data
 * ************************** */
async function getInventory(){
    try{
        const data = await pool.query(
            "SELECT * FROM public.inventory"
        )
        return data.rows
    } catch (error) {
        console.error("getinventory error " + error)
    }
}


module.exports = {getInventory}