const {RunSQL} = require("../config/performSQL.js");
const {validateToken} = require("../models/tokenGen.js");
const { error } = require("console");
const {addUserToDatabase} = require("../models/signupHash.js");


async function addFriend(username, friend){


    try{

    let query = "SELECT friends FROM allUsers WHERE username = (?)"
    let values = [username]
    const friends = await RunSQL(query, values);


    column = friends[0].friends;
    column = JSON.parse(column);

    if(column.includes(friend)){
        return {friend : friend, msg : "Friend already added"}
    } else {

    column.push(friend);
    column = JSON.stringify(column);

    let query2 = "UPDATE allUsers SET friends = (?) WHERE username = (?)"
    let values2 = [column, username]
    await RunSQL(query2, values2, () => {
    console.log("Friend added")
    });  


    let query3 = "SELECT friends FROM allUsers WHERE username = (?)"
    let values3 = [friend]
    const friends2 = await RunSQL(query3, values3);

    column2 = friends2[0].friends;
    column2 = JSON.parse(column2);

    if(column2.includes(username)){
        return {friend : friend, msg : "Friend already added"}
    } else {

    column2.push(username);
    column2 = JSON.stringify(column2);

    let query4 = "UPDATE allUsers SET friends = (?) WHERE username = (?)"
    let values4 = [column2, friend]
    await RunSQL(query4, values4, () => {
    console.log("Friend added both places")
    })

        }
    } 

        return true;
    }   catch(err){
        return false
    }

}

  module.exports = {addFriend}