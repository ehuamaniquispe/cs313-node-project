const credentialsModel = require("../models/credentialsModel.js"); 
var session = require('express-session');
var bcrypt = require('bcryptjs');

app.use(session({secret:'sdsadasd'})); //initializing the session

let checkCredentials = (req, res)=>{
    console.log("checking credentials ...");
    let userName = req.body.userName; // we use req.body because is a POST request
    let pass = req.body.pass;
    
    let results = credentialsModel.checkCredentials(userName,pass,(error,result)=>{
        
        if(res){
            req.session.username = userName;//storing the userName in the session
            res.json({success:true});

        }
        else{
            res.json({success:false})
        }
        
        res.json(result);
    });

}

let showStartingPage=(req,res)=>{
    res.render('login');

}


module.exports = {
 checkCredentials,
 showStartingPage
};