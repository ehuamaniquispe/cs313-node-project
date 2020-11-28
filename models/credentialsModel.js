let checkCredentials=(userName,pass,callback)=>{
    result = {
        "user":[
            {userName, pass}
        ]
    };
    callback(null, result);

}

module.exports={
    checkCredentials
};