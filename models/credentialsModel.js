const{Pool} = require ("pg");
const db_url = process.env.DATABASE_URL;

console.log(`DB url is ${db_url}`);
const pool = new Pool({connectionString:db_url});

let checkCredentials=(userName,pass,callback)=>{

    let sql = "SELECT * FROM familymember";
    pool.query(sql,(err,db_results)=>{

        if(err){
            throw err;
        }else{
            console.log("back from DB");
            console.log(db_results);
            result = {
                "user":[
                    {userName, pass}
                ]
            };
            callback(null, result);
        }
    });


}

module.exports={
    checkCredentials
};