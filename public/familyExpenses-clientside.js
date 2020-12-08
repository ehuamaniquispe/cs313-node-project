
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

let checkCredentials=()=>{
       console.log("checking credentials from the client...");
       let userName = $("#userName").val();
       let password = $("#password").val();

       console.log(userName);
       console.log(password);

       $.post("/credentials",{userName,pass:password},(data)=>{
           console.log("datafrom client side"+data);
           if(data ==1){
               $("#result").append("Welcome");
           }

       })

}