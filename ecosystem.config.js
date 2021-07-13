// config file for Pm2
module.exports = {
    apps : [{
      name   : "family_expenses_v1.0",
      script : "./index.js",
      watch : true,
      interpreter: "/root/.nvm/versions/node/v12.22.1/bin/node"
    }]
  }