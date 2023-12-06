
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

const query = "DELETE FROM users"
const select = "SELECT * FROM users"
const values = ["Gert"]

function RunSQL(query, values){

    return new Promise((resolve, reject)  => {
         db.all(query, values, function(err, rows){
            if(err) {
                console.log(err)
                reject(err)
            } else {
                
                resolve(rows)
                console.log(rows)
            }
        })
    })
}
//RunSQL(query)
//RunSQL(select)

module.exports = {RunSQL}