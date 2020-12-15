const incomesModel = require ("../models/incomesModel.js");


//gests all expenses
let expensesList = (req,res)=>{
    console.log("getting all expenses ...")
    let userRole = req.session.userrole;
    let userId = req.session.userid;
    
    expenseModels.getAllExpenses((error,results)=>{
            if(results){
                console.log(results[0].expenses_description);
                res.render('expenses',{results,userRole,userId});
            }
    });
}

let new_income=(req,res)=>{
    res.render('newIncome');
}

let add_income =(req,res) =>{
    let description = req.body.description;
    let amount= req.body.amount;
    let date = new Date();
    let userId = req.session.userid;

    incomesModel.insertIncome(description,amount,date,userId,(err,result)=>{
        if(result){
            //TODO:create message of success
            console.log("income inserted successfully")
            res.redirect('/expenses');
            
        }else{
            console.log("there was an error inserting the income...")
            
        }
    });
}

module.exports ={
    new_income
 
};