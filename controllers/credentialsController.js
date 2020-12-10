const credentialsModel = require("../models/credentialsModel.js"); 

var bcrypt = require('bcryptjs');



let checkCredentials = (req, res)=>{
    console.log("checking credentials ...");
    let userName = req.body.userName; // we use req.body because is a POST request
    let pass = req.body.password;
    
    console.log(userName);
    console.log(pass);

    
    credentialsModel.checkCredentials(userName,pass,(error,result)=>{
        
        if(result.length == 1){
            console.log("storing user name in a session...");
            req.session.username = userName;//storing the userName in the session
            req.session.userid = result[0].idfamilymember;
            res.redirect('/expenses');
            
        }
        else{
            console.log("can not store user name in a session...");
            res.json({success:false})
        }
        
        
    });

}

let showStartingPage=(req,res)=>{
    res.render('login');

}


module.exports = {
 checkCredentials,
 showStartingPage
};