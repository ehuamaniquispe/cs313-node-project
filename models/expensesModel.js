const{Pool} = require ("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectionString:db_url});

let getAllExpenses = (callback)=>{
   let sql = "SELECT * FROM expenses INNER JOIN familymember ON expenses.familymember_idfamilymember = familymember.idfamilymember"; 
   pool.query(sql,(err,db_result)=>{
       console.log(db_result.rows);
       callback(null,db_result.rows);
});


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