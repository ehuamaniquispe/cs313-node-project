const{Pool} = require ("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({connectionString:db_url});

//inserting incomes
let insertIncome=(description,amount,date,userId,callback)=>{
    let sql = "INSERT INTO incomes (incomes_description,incomes_amount, incomes_date,familymember_idfamilymember) VALUES($1,$2,$3,$4)";
    let values = [description,amount,date,userId]; 
    pool.query(sql,values,(err,db_result)=>{
        if(err){
            throw err;
        }else{
            console.log(db_result.rowsCount);
            callback(null,db_result.rowsCount);
        }
 });    

}

module.exports = {
    insertIncome
    
};