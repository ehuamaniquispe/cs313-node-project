const expenseModels = require ("../models/expensesModel.js");

let expensesList = (req,res)=>{
    console.log("getting all expenses ...")
    
    let results = expenseModels.getAllExpenses((error,results)=>{
            res.json(results);
    });

}

let insertExpense = (req,res)=>{
    let amount = req.body.amount;
    console.log(`creating a new expense with amount:${amount}`);

    let results = expenseModels.insertNewExpense(amount, (error,results)=>{

            res.json(results);
    });

}

module.exports ={
    expensesList,
    insertExpense
};