//SKRIV ALLE JERES CONFIGS HER OG EKSPORTER DEM

// Twilio oplysninger fra min (ottos bruger)
const twilioDetail = {
  accountSid: "ACc51e52fb55e9f546269424e7756bdaf9",
  authToken: "abf8956e0b040a230e8621413741aa4d",
};

const products = [{
id : 1, 
  name : "Joes Club", 
  price : 65, 
  img : "https://static.takeaway.com/images/restaurants/dk/Q1POQ1RN/products/aHR0cHM6Ly9kZTJ5eXB2bGQwZzdzLmNsb3VkZnJvbnQubmV0LzE1ODcxNDhmLWJlNTAtNGI5Yy1iYWFhLWY0YzA4MjQ3MDE1OC9KT0VzIENsdWIteDIuanBn.jpg?timestamp=1696238038", 
  desc : "The Joe's Club Sandwich is a culinary delight that combines layers of savory goodness in every bite. This classic sandwich is a masterpiece, featuring slices of tender roasted turkey, smoky bacon, crisp lettuce, juicy tomatoes, and creamy mayonnaise, all stacked between layers of toasted bread. What sets Joe's Club Sandwich apart is the perfect balance of flavors and textures – the succulent turkey contrasts beautifully with the crunch of bacon and fresh vegetables, creating a harmonious blend that satisfies the taste buds. Whether enjoyed as a quick lunch or a satisfying dinner, the Joe's Club Sandwich never fails to deliver a delightful culinary experience, making it a favorite choice for sandwich enthusiasts everywhere."}, 
{id : 2, 
  name : "Joes Avocado", 
  price : 55, 
  img : "https://de2yypvld0g7s.cloudfront.net/dbf0a33c-f073-4978-a273-9632f98e6b1a/Avocado-x1.jpg", 
  desc : "Joe Avocado, also known as Avocado Joe, is a beloved culinary creation that celebrates the rich, creamy goodness of avocados. With its buttery texture and subtle nutty flavor, Joe Avocado has become a versatile ingredient in various dishes. Whether mashed into guacamole, sliced on toast, or blended into smoothies, Joe Avocado adds a delightful twist to any recipe. Its nutritional profile, boasting healthy fats, vitamins, and minerals, makes it a favorite among health-conscious individuals. Joe Avocado is not just a fruit; it represents a lifestyle choice, emphasizing the importance of wholesome, natural foods in a balanced diet. Its popularity continues to soar, making it a staple in kitchens around the world, where food enthusiasts and chefs alike appreciate its culinary magic."}, 
{id : 3, 
  name : "Powershake", 
  price : 45, 
  img : "https://scontent-cph2-1.xx.fbcdn.net/v/t1.6435-9/66647808_2453007478092226_8160505800192688128_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=NWeL3UHZqW8AX_hOr7N&_nc_ht=scontent-cph2-1.xx&oh=00_AfDjAKPwoecn3KbIFq_bAzUlMHAiHeUwWwklpW5S2Ah_tA&oe=65722230", 
  desc : "The Joe's Power Shake is a nutritious and energizing beverage that has gained popularity among health enthusiasts and fitness aficionados. This revitalizing shake is packed with a powerhouse of ingredients, typically including fresh fruits like bananas and berries, protein-rich Greek yogurt or plant-based protein powder, nutrient-dense leafy greens such as spinach or kale, and a splash of almond milk or coconut water for a creamy consistency. Some variations might also include chia seeds, flaxseeds, or a dollop of natural peanut butter for added texture and flavor."
}]

const user = [{
id : 1,
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
friends : [2, 3]
}, {
id : 2,
firstname: "Jane",
lastname: "Doe",
username: "JaneDoe", 
email: "janedoe@mail.dk",
password: "kodeord",
age: 34,
phone: 11112222,
address: "Sydhavn Plads 12",
city: "København S",
zip: 2450,
country: "Denmark",
friends : [1, 3]
},
{
id : 3,
firstname: "Christopher",
lastname: "March",
username: "ChrisMarch", 
email: "chrisMarch@mail.dk",
password: "kodeord",
age: 55,
phone: 11112222,
address: "Sydhavn Plads 12",
city: "København S",
zip: 2450,
country: "Denmark",
friends : [1,2]
}];


module.exports = { twilioDetail, user, products};


