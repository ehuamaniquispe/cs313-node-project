const{Pool} = require ("pg");
const pool = new Pool();// uses the .env database variables

//getting all expenses
let getAllExpenses = async ()=>{
   let sql = "SELECT * FROM expenses INNER JOIN familymember ON expenses.familymember_idfamilymember = familymember.idfamilymember ORDER BY idexpenses DESC"; 
  try{
      let db_result= await pool.query(sql);
      console.log("in model:"+db_result.rows);
      return db_result.rows;
  }catch(e){
     throw e;
  }
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
        if(err){
            console.log("there is an error ...")
            throw err;
        }else{
            console.log("got info from db query"+db_result.rows);
            callback(null,db_result.rows);
        }
});
}

let updateExpense = (expenseId,description,amount,callback) =>{

    let sql = "UPDATE expenses SET expenses_description = $1, expenses_amount = $2 WHERE idexpenses = $3"; 
    let values = [description,amount,expenseId];
    pool.query(sql,values,(err,db_result)=>{
        if(err){
            throw err
        }else{
            console.log(db_result);
            callback(null,db_result);
        }
    });
}

//TODO: implement to be per month
let sumExpenses=async ()=>{

    let sql = "SELECT SUM (expenses_amount) AS total_expense FROM expenses";
    let total_expense = await pool.query(sql);
    console.log(total_expense);
    return total_expense.rows;    

}


module.exports = {
    getAllExpenses,
    insertNewExpense,
    deleteExpense,
    getExpenseById,
    updateExpense,
    sumExpenses
};