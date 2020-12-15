const{Pool} = require ("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectionString:db_url});

//getting all expenses
let getAllExpenses = (callback)=>{
   let sql = "SELECT * FROM expenses INNER JOIN familymember ON expenses.familymember_idfamilymember = familymember.idfamilymember"; 
   pool.query(sql,(err,db_result)=>{
       console.log(db_result.rows);
       callback(null,db_result.rows);
});
}

//inserting a new expense
let insertNewExpense = (description,amount,userId, callback) =>{
    //create the new topic in the DB
    let date = new Date();
    let sql = "INSERT INTO expenses(expenses_description,expenses_amount,expenses_date,familymember_idfamilymember) VALUES ($1,$2,$3,$4)"; 
    let values = [description,amount,date,userId];
    pool.query(sql,values,(err,db_result)=>{
        if(err){
            throw err
        }else{
            console.log(db_result.rowCount);
            callback(null,db_result.rowCount);
        }
    });
}

//deleting expense using async await
let deleteExpense= async (expenseId)=>{
    let sql = "DELETE FROM expenses WHERE idexpenses = $1";
    let value = [expenseId];
    let db_result = await pool.query(sql,value)
    console.log("db_result:"+db_result);
    return db_result;
}


//getting expenses information by expense id
let getExpenseById = (expenseId,callback) =>{
    console.log("expenseId"+expenseId);
    let sql = "SELECT * FROM expenses WHERE idexpenses = $1";
    let value = [expenseId]; 
    pool.query(sql,value,(err,db_result)=>{
        // if(err){
        //     console.log("there is an error ...")
        //     throw err;
        // }else{
            console.log("got info from db query"+db_result.rows);
            callback(null,db_result.rows);
        // }
});
}

let updateExpense = (expenseId,description,amount) =>{

    let sql = "UPDATE expenses SET expenses_description = $1, expenses_amount = $2 WHERE idexpenses = $3"; 
    let values = [description,amount,expenseId];
    pool.query(sql,values,(err,db_result)=>{
        if(err){
            throw err
        }else{
            console.log(db_result.rowCount);
            callback(null,db_result.rowCount);
        }
    });

}

module.exports = {
    getAllExpenses,
    insertNewExpense,
    deleteExpense,
    getExpenseById,
    updateExpense
};