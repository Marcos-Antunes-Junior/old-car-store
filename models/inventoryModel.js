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


/* ***************************
 *  Get inventory data by ID
 * ************************** */
async function getInventoryByID(inv_id){
  try{
    const data = await pool.query(
        "SELECT * FROM public.inventory where inv_id = $1",[inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("getinventorybyid error " + error)
  }
}

module.exports = {getInventory, getInventoryByID}