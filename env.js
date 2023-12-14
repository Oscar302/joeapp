// Load environment variables from a .env file
require('dotenv').config();

// Log all environment variables
Object.entries(process.env).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
