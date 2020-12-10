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

    console.log("going to the form...")
    res.render('newExpense');
}

let insertExpense = (req,res)=>{
    let description = req.body.description;
    let amount = req.body.amount;
    let userId = req.session.userid;
    // res.json({success:true});


    expenseModels.insertNewExpense(description,amount,userId, (error,results)=>{

            res.json(results);
    });

}

module.exports ={
    expensesList,
    insertExpense,
    newExpense
};