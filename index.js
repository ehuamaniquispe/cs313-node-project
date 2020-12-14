const express = require("express");
const path = require("path");
const session = require('express-session');
require('dotenv').config();
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const expensesController = require("./controllers/expensesController.js");
const credentialsController = require("./controllers/credentialsController.js");

const PORT = process.env.PORT || 5000
var app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname ,"public")));
app.use(express.json());// support json encoded bodies
app.use(express.urlencoded({extended:true}));//support url encoded bodies
app.use(session({secret:'sdsadasd'})); //initializing the session

//middleware to check access to pages
const verifyLogin=(req,res,next)=>{
    if(req.session.username){
        next();
    }
    else{
        res.status(401).send("It's not authorized");
    }
}


//login
app.get("/",credentialsController.showStartingPage);
app.post("/credentials",credentialsController.checkCredentials);

//expenses
app.get("/expenses",verifyLogin,expensesController.expensesList);
app.get("/new_expense",verifyLogin,expensesController.newExpense);
app.post("/add_expense",verifyLogin, expensesController.insertExpense);
app.post("/delete_expense",verifyLogin,expensesController.deleteExpense);


app.listen (PORT,function(){
    console.log("Server listening on port"+PORT);
});