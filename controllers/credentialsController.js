const credentialsModel = require("../models/credentialsModel.js"); 

var bcrypt = require('bcryptjs');



let checkCredentials = (req, res)=>{
    console.log("checking credentials ...");
    let userName = req.body.userName; // we use req.body because is a POST request
    let pass = req.body.pass;
    
    credentialsModel.checkCredentials(userName,pass,(error,result)=>{
        
        if(result){
            req.session.username = userName;//storing the userName in the session
            res.json({success:true});

        }
        else{
            res.json({success:false})
        }
        
        
    });

}

// let showStartingPage=(req,res)=>{
//     res.render('login');

// }


module.exports = {
 checkCredentials
};