//SKRIV ALLE JERES CONFIGS HER OG EKSPORTER DEM

// Twilio oplysninger fra min (ottos bruger)
const twilioDetail = {
  accountSid: "ACc51e52fb55e9f546269424e7756bdaf9",
  authToken: "abf8956e0b040a230e8621413741aa4d",
};

const products = [{id : 1, name : "Joes Club", price : 65}, {id : 2, name : "Joes Avocado", price : 55}]

const user = {
  firstname: "John",
  lastname: "Doe",
  username: "JohnDoe", 
  email: "joedoe@gmail.com",
  password: "kodeord",
  age: 21,
  phone: 11112222,
  address: "Solbjerg Plads 12",
  city: "Frederiksberg",
  zip: 2000,
  country: "Denmark",
};

module.exports = { twilioDetail, user, products};


