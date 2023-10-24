var express = require("express");
var app = express();
const bodyparser = require('body-parser')
const port = 8000;
var router = require("./routes/router");
const path = require("path")
const session =require ('express-session')
const db = require('./connect')
const MySQLStore = require('express-mysql-session')(session);


app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


const sessionStore =new MySQLStore({
  expiration : 24 * 60 * 60 * 100,
  clearExpired:true,
  createDatabaseTable:true,
  
},db);
 
app.use(session({
    secret:"secret-key",
    store: sessionStore,
    resave : true,
    saveUninitialized:true,

}))

app.set("view engine", "ejs");
app.set("views", "view");
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");

      }
    }

  })
);
app.use(router)
app.listen(port, () => {
  console.log("server ini sudah berjalan");
});
