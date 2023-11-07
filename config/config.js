//SKRIV ALLE JERES CONFIGS HER OG EKSPORTER DEM

// Twilio oplysninger fra min (ottos bruger)
const twilioDetail = {
  accountSid: "ACc51e52fb55e9f546269424e7756bdaf9",
  authToken: "abf8956e0b040a230e8621413741aa4d",
};

const products = [{id : 1, name : "Joes Club", price : 65, img : "https://static.takeaway.com/images/restaurants/dk/Q1POQ1RN/products/aHR0cHM6Ly9kZTJ5eXB2bGQwZzdzLmNsb3VkZnJvbnQubmV0LzE1ODcxNDhmLWJlNTAtNGI5Yy1iYWFhLWY0YzA4MjQ3MDE1OC9KT0VzIENsdWIteDIuanBn.jpg?timestamp=1696238038", desc : "The Joe's Club Sandwich is a culinary delight that combines layers of savory goodness in every bite. This classic sandwich is a masterpiece, featuring slices of tender roasted turkey, smoky bacon, crisp lettuce, juicy tomatoes, and creamy mayonnaise, all stacked between layers of toasted bread. What sets Joe's Club Sandwich apart is the perfect balance of flavors and textures – the succulent turkey contrasts beautifully with the crunch of bacon and fresh vegetables, creating a harmonious blend that satisfies the taste buds. Whether enjoyed as a quick lunch or a satisfying dinner, the Joe's Club Sandwich never fails to deliver a delightful culinary experience, making it a favorite choice for sandwich enthusiasts everywhere."}, {id : 2, name : "Joes Avocado", price : 55}, {id : 3, name : "Powershake", price : 45, img : "https://scontent-cph2-1.xx.fbcdn.net/v/t1.6435-9/66647808_2453007478092226_8160505800192688128_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=NWeL3UHZqW8AX_hOr7N&_nc_ht=scontent-cph2-1.xx&oh=00_AfDjAKPwoecn3KbIFq_bAzUlMHAiHeUwWwklpW5S2Ah_tA&oe=65722230", desc : "The Joe's Power Shake is a nutritious and energizing beverage that has gained popularity among health enthusiasts and fitness aficionados. This revitalizing shake is packed with a powerhouse of ingredients, typically including fresh fruits like bananas and berries, protein-rich Greek yogurt or plant-based protein powder, nutrient-dense leafy greens such as spinach or kale, and a splash of almond milk or coconut water for a creamy consistency. Some variations might also include chia seeds, flaxseeds, or a dollop of natural peanut butter for added texture and flavor."}]

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


