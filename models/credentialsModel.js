const{Pool} = require ("pg");
const db_url = process.env.DATABASE_URL;
var bcrypt = require('bcryptjs');

console.log(`DB url is ${db_url}`);
const pool = new Pool({connectionString:db_url});

let checkCredentials=(userName,pass,callback)=>{


    // checking username
    let sql = "SELECT * FROM familymember WHERE familymember_username = $1";
    
    let values = [userName];
    // let values = [userName,pass];
    
    pool.query(sql,values,(err,db_results)=>{
        
        if(err){
            //throw err;
            callback(err.message, {success:false});                    
        }else{
            if(db_results.rows.length == 1){
                
                // checking password
                bcrypt.compare(pass, db_results.rows[0].familymember_pass)
                .then((res) => {
                    
                   if(res===true){// res === true
                    console.log("password Matched");
                    callback(null, {success:true});                    
                }
                else{
                    
                    console.log("password didn't match");
                        callback("incorrect password", {success:false});                    
                    }
                }).catch((err)=>{
                    callback(err.message, {success:false});                    
                    

                });
            
            }
           
        }
    });


}


// update plain password to hashed password from database
let updatePassToHash=(pass,userName)=>{

    let sql = "UPDATE familymember SET familymember_pass = $1 WHERE familymember_username = $2";
    let values = [pass, userName];
    pool.query(sql,values);

}

module.exports={
    checkCredentials,
    updatePassToHash

};