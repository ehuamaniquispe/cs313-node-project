const express = require("express");
const path = require("path");
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


//login
//app.get("/",credentialsController.showStartingPage);

app.post("/credentials",credentialsController.checkCredentials);

//expenses
app.get("/expenses",expensesController.expensesList);
app.post("/expense", expensesController.insertExpense);



app.listen (PORT,function(){
    console.log("Server listening on port"+PORT);
});