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
            throw err;
        }else{
            if(db_results.rows.length == 1){
                
                result = 1; 
                callback(null, result);
                console.log(db_results.rows);
                console.log(`the password is : ${pass}`);
                console.log(`the password is 2: ${db_results.rows[0].familymember_pass}`);
                // checking password
                bcrypt.compare(pass, db_results.rows[0].familymember_pass)
                .then((res) => {
                    
                   if(res==true){// res === true
                    console.log("password matched");
                   }
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