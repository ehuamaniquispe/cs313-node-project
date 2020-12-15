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
            res.redirect('/expenses');
    });
}

let deleteExpense = async(req,res)=>{
    let expenseId = req.params.id; 
    console.log("id:"+expenseId);
    let deleteResult = await expenseModels.deleteExpense(expenseId);
    console.log("expenses controller ..");
    console.log(deleteResult);
    if(deleteResult[0] == 1){
        res.redirect('/expenses');
    }

}

module.exports ={
    expensesList,
    insertExpense,
    newExpense,
    deleteExpense
};