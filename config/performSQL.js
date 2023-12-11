
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

//const query = "DROP TABLE allUsers"

let query = "UPDATE allUsers SET friends = (?)"
let values = ["[]"]

function RunSQL(query, values){

    //console.log(query, values);

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