const{Pool} = require ("pg");
const db_url = process.env.DATABASE_URL;

let getAllExpenses = (callback)=>{


let sql = "SELECT * FROM expenses"; 
pool.query(sql,(err,db_result)=>{
    console.log(db_result.rows);
});


    callback(null,db_result);
    // callback(null,results);
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