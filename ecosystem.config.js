module.exports = {
    apps: [{
        script: "server.js",
        instances: "max",
        ACCOUNT_SID : "AC044fb01afdc5d1d9e686400062ca3d05",
        AUTH_TOKEN_TWI : "5eaabdb9d75632ceb45454c3d2a05e40",
        API_KEY : process.env.API_KEY,
      }]
}