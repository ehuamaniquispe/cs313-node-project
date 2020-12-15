const usersModel = require ("../models/usersModel.js");

let new_user=(req,res)=>{
    res.render('newUser');
}


let add_user = (req,res)=>{
    let name=req.body.name;
    let userName=req.body.userName;
    let password=req.body.password;
    let role=req.body.role;

    usersModel.insertUser(name,userName,password,role,(err, result)=>{
        if(result){
            //TODO: show a message of success
            console.log("user inserted successfully")
            res.redirect('/expenses');

        }else{
            console.log("error inserted has ocurred...")
        }

    });

}

module.exports ={
   new_user,
   add_user
 
};