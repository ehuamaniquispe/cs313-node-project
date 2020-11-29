const{Pool} = require ("pg");
const db_url = process.env.DATABASE_URL;

console.log(`DB url is ${db_url}`);
const pool = new Pool({connectionString:db_url});

let checkCredentials=(userName,pass,callback)=>{

    let sql = "SELECT * FROM familymember WHERE familymember_username = $1 AND familymember_pass = $2";

    let values = [userName,pass];

    pool.query(sql,values,(err,db_results)=>{

        if(err){
            throw err;
        }else{
            if(db_results.rows.length == 1){

                result = 1; 
                
                callback(null, result);
            }
           
        }
    });


}

module.exports={
    checkCredentials
};