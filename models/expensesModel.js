let getAllExpenses = (callback)=>{

    var results={
        expenses:[
            {id:1, amount: 2.5},
            {id:2, amount: 4}
        ]
    }
    callback(null,results);
}

let getExpensesByUser = (userId) =>{

}

let insertNewExpense = (amount, callback) =>{
    //create the new topic in the DB
    let results = {sucess:true};
    callback(null,results);


}

module.exports = {
    getAllExpenses,
    insertNewExpense
}