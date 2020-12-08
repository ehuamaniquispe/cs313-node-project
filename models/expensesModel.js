const{Pool} = require ("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectionString:db_url});

let getAllExpenses = (callback)=>{


let sql = "SELECT * FROM expenses"; 
let results = pool.query(sql,(err,db_result)=>{
    console.log(db_result.rows);
    db_result;
});


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