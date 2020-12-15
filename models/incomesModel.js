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
            console.log(db_result.rowCount);
            callback(null,db_result.rowCount);
        }
 });    

}

//TODO: implement to be per month
let sumIncomes=async ()=>{

    let sql = "SELECT SUM (incomes_amount) AS total_income FROM incomes";
    let total_income = await pool.query(sql);
    console.log(total_income);
    return total_income.rows;    

}

let getAllIncomes = (callback) =>{

    let sql = "SELECT * FROM incomes INNER JOIN familymember ON incomes.familymember_idfamilymember = familymember.idfamilymember"; 
       pool.query(sql,(err,db_result)=>{

           console.log("in model:"+db_result.rows);
           callback(null,db_result.rows);
       });

}

module.exports = {
    insertIncome,
    sumIncomes,
    getAllIncomes
    
};