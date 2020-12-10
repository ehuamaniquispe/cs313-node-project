const expenseModels = require ("../models/expensesModel.js");

//gests all expenses
let expensesList = (req,res)=>{
    console.log("getting all expenses ...")
    
    expenseModels.getAllExpenses((error,results)=>{
            if(results){
                console.log(results[0].expenses_description);
                res.render('expenses',{results});
            }
    });

}

//shows the form for new expenses
let newExpense = (req,res)=>{

    // res.json({success:true});
    console.log("going to the form...")
        res.render('newExpense');
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
    insertExpense,
    newExpense
};