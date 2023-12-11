const {RunSQL} = require("../config/performSQL.js");
const {validateToken} = require("../models/tokenGen.js");
const { error } = require("console");
const {addUserToDatabase} = require("../models/signupHash.js");


async function addFriend(username, friend){


    let room = username + friend;

    const userFriends = [];

    try{

    let query = "SELECT friends FROM allUsers WHERE username = (?)"
    let values = [username]
    const friends = await RunSQL(query, values);
    
    column = friends[0].friends;
    column = JSON.parse(column);

    for(let i = 0; i < column.length; i++){
       console.log(column[i].friend)  
       if(column[i].friend === friend){
            console.log("Already friends")
           return false
       }
    }

    
    column.push({friend : friend, room : room});
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

    for(let i = 0; i < column2.length; i++){
        if(column2[i].friend === username){
            console.log("Already friends")
            return false
        }
    }
    
    column2.push({friend : username, room : room});
    column2 = JSON.stringify(column2);

    let query4 = "UPDATE allUsers SET friends = (?) WHERE username = (?)"
    let values4 = [column2, friend]
    await RunSQL(query4, values4, () => {
    console.log("Friend added both places")
    })
        //console.log("Friend added both places")
        return true;
    }   catch(err){
        //failed request
        return false
    }
    
}

  module.exports = {addFriend}