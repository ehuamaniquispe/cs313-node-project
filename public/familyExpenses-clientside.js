

let checkCredentials=()=>{
       console.log("checking credentials from the client...");
       let userName = $("#userName").val();
       let password = $("#password").val();

       console.log(userName);
       console.log(password);

       $.post("/credentials",{userName,pass:password},(data)=>{
           console.log("datafrom client side"+data);

       })

}