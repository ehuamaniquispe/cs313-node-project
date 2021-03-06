const dateFormat = require("dateformat");
const expenseModels = require ("../models/expensesModel.js");
const incomesModels = require ("../models/incomesModel.js");


//gests all expenses
let expensesList = async (req,res)=>{
    console.log("getting all expenses ...")
    let userRole = req.session.userrole;
    let userId = req.session.userid;
    
    let results = await expenseModels.getAllExpenses();
    let total_income = await incomesModels.sumIncomes();
    let total_expense = await expenseModels.sumExpenses();
    let diference = (total_income[0].total_income - total_expense[0].total_expense)*10/10;

   
    //updating json object format- expenses_date key
    results.forEach(x => {
        x.expenses_date = dateFormat(x.expenses_date, "dd/mm/yy");
      });

    res.render('expenses',{results,userRole,userId,total_income:total_income[0], total_expense:total_expense[0],diference});
                
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

let deleteExpense = async (req,res)=>{
    let expenseId = req.params.id; 
    console.log("id:"+expenseId);
    let deleteResult =  await expenseModels.deleteExpense(expenseId);
    console.log("expenses controller ..");
    console.log(deleteResult);
    if(deleteResult.rowCount == 1){
        res.redirect('/expenses');
    }
}
let update_Expense = (req,res)=>{
    
    let expenseId = req.params.id; 
    expenseModels.getExpenseById(expenseId,(error,result)=>{
        if(result[0]){
            res.render('updateExpense', {result:result[0]});
        }else{
            res.send("there is an error ...");
        }
    });
}
let updateExpense = (req,res)=>{
    console.log("in update expense...");

    let expenseId = req.body.expenseId; 
    let description = req.body.description; 
    let amount = req.body.amount; 

    console.log("expenseId"+expenseId)
    console.log("description"+description)
    console.log("amount"+amount)

    expenseModels.updateExpense(expenseId,description,amount,(error,result)=>{

        if(result.rowCount == 1){
            res.redirect('/expenses');
        }
    });

}



module.exports ={
    expensesList,
    insertExpense,
    newExpense,
    deleteExpense,
    update_Expense,
    updateExpense
 
};