const credentialsModel = require("../models/credentialsModel.js"); 

let checkCredentials = (req, res)=>{
    console.log("checking credentials ...");
    let userName = req.body.userName; // we use req.body because is a POST request
    let pass = req.body.pass;
    
    let results = credentialsModel.checkCredentials(userName,pass,(error,result)=>{
        res.json(result);
        // if(result == 1){
        //     // res.sendFile('/app/public/expenses.html');
        //     // res.sendFile('/app/public/expenses.html');
        // }

    });

}

let showStartingPage=(req,res)=>{
    res.render('login');

}


module.exports = {
 checkCredentials,
 showStartingPage
};