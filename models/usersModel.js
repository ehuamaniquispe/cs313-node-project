const{Pool} = require ("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectionString:db_url});


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

module.exports = {
    
};