const{Pool} = require ("pg");
const pool = new Pool();// uses the .env database variables
var bcrypt = require('bcryptjs');


let checkCredentials=(userName,pass,callback)=>{

    console.log("checking credential in model");
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
                    callback(null, db_results.rows);                    
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
let updatePassToHash=(userName,pass)=>{
  
    var hash = bcrypt.hashSync(pass, 10);
    let sql = "UPDATE familymember SET familymember_pass = $1 WHERE familymember_username = $2";
    let values = [hash, userName];
    pool.query(sql,values);

}

module.exports={
    checkCredentials,
    updatePassToHash

};