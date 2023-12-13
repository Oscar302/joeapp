// Count and log the number of environment variables
const numberOfVariables = Object.keys(process.env).length;

console.log(`Number of environment variables: ${numberOfVariables}`);

// Log the names and values of each environment variable
Object.entries(process.env).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});