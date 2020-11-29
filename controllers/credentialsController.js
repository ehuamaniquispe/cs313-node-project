const credentialsModel = require("../models/credentialsModel.js"); 

let checkCredentials = (req, res)=>{
    console.log("checking credentials ...");
    let userName = req.body.userName; // we use req.body because is a POST request
    let pass = req.body.pass;
    // console.log(userName);
    // console.log(pass);
    let results = credentialsModel.checkCredentials(userName,pass,(error,result)=>{
        // res.json(result);
        if(result == 1){
            res.send("Welcome!");
        }

    });

}

module.exports = {
 checkCredentials
};