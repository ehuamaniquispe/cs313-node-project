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

};

let insertNewExpense = (description,amount,userId, callback) =>{
    //create the new topic in the DB
    let date = new Date();
    let sql = "INSERT INTO expenses(expenses_description,expenses_amount,expenses_date,familymember_idfamilymember) VALUES ($1,$2,$3,$4)"; 
    let values = [description,amount,date,userId ];
    pool.query(sql,values,(err,db_result)=>{
       console.log(db_result.rowCount);
       callback(null,db_result.rowCount);
    })
};

let deleteExpense= async (studentId)=>{
    let sql = "DELETE FROM expenses WHERE idexpenses = $1";
    let value = [studentId];
    let db_result = await pool.query(sql,value)
    console.log("db_result:"+db_result);
    return db_result.rowCount;
}

module.exports = {
    getAllExpenses,
    insertNewExpense,
    deleteExpense
};