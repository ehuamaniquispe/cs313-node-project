const{Pool} = require ("pg");
const pool = new Pool();// uses the .env database variables
var bcrypt = require('bcryptjs');


//inserting a new user
let insertUser = (name,userName,password,role, callback) =>{
    var hash = bcrypt.hashSync(password, 10);
    let sql = "INSERT INTO familymember(familymember_name, familymember_username, familymember_pass, familymember_role) VALUES ($1,$2,$3,$4)"; 
    let values = [name,userName,hash,role];
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
    insertUser  
};