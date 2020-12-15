const incomesModel = require ("../models/incomesModel.js");


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

let incomes_detail =(req,res) =>{

    incomesModel.getAllIncomes((err,results)=>{
        if(results){

            res.render('incomes',{results});
        }else{
            console.log("there was an error getting all the incomes :(")
        }
    });

}

module.exports ={
    new_income,
    add_income,
    incomes_detail
 
};