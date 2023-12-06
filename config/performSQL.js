
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

const query = "DELETE FROM users"
const select = "SELECT * FROM users"

function RunSQL(query, values){

    return new Promise((resolve, reject)  => {
         db.all(query, values, function(err, rows){
            if(err) {
                console.log(err)
                reject(err)
            } else {
                
                resolve(rows)
                //console.log("RunSQL",rows)
            }
        })
    })
}

module.exports = {RunSQL}