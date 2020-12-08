const credentialsModel = require("../models/credentialsModel.js"); 
var session = require('express-session');
var bcrypt = require('bcryptjs');

let checkCredentials = (req, res)=>{
    console.log("checking credentials ...");
    let userName = req.body.userName; // we use req.body because is a POST request
    let pass = req.body.pass;

    var hash = bcrypt.hashSync(pass, 10);

    credentialsModel.updatePassToHash(hash,userName);

    
    // let results = credentialsModel.checkCredentials(userName,pass,(error,result)=>{
    //     res.json(result);
       

    // });

}

let showStartingPage=(req,res)=>{
    res.render('login');

}


module.exports = {
 checkCredentials,
 showStartingPage
};