const expenseModels = require ("../models/expensesModel.js");


//gests all expenses
let expensesList = async (req,res)=>{
    console.log("getting all expenses ...")
    let userRole = req.session.userrole;
    let userId = req.session.userid;
    
    let allExpensesResult =  await expenseModels.getAllExpenses();
        // let allExpensesResult = expenseModels.getAllExpenses((error,results)=>{
            //         if(results){
                //             console.log(results[0].expenses_description);
                //             res.render('expenses',{results,userRole,userId});
                //         }
                // });

                allExpensesResult.then((result)=>{

                    console.log("allExpensesResult:"+result[0]);
                    res.render('expenses',{result,userRole,userId});
                }).catch(err){
                    console.log("errorrrr:"+err);
                };
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