var express = require ('express');
var app = express();
var fs = require('fs')
const bodyParser = require ("body-parser")
var jsonfile = require('jsonfile')
app.use (bodyParser.urlencoded({extended:true}))


app.set ('view engine', 'pug')

app.get('/', function(request, response){
  fs.readFile('users.json', function(err,data) {
    if (err) {
      throw err;
    }
    var users = JSON.parse(data)
  response.render("index", {users:users})
  })
})

app.get("/form", (request, response) => {
  response.render ("form")})

app.post("/searchUsers", function(req,res) {
  fs.readFile('users.json', function(err,data) {
    if (err) {
      throw err;
    }
    var users = JSON.parse(data)
    var found = false
    var foundUser = []

    for (var i = 0; i < users.length; i++){
      if (req.body.name === users[i].firstname && req.body.lastname === users[i].lastname ||
          req.body.name === users[i].firstname && req.body.lastname === "" ||
          req.body.name === "" && req.body.lastname === users[i].lastname) {
        found = true
        foundUser.push(users[i])
      }
    }

    if(found === true){
      res.render("success", {FirstName:foundUser[0].firstname, LastName:foundUser[0].lastname, Email:foundUser[0].email})
    }
    else{
      res.redirect("/form")
    }
  })
})

app.get("/addUser", (req, res) => {
  res.render ("addUser")})

app.post("/createUser", function(req, res) {
  fs.readFile('users.json', function(err,data) {
    if (err) {
      throw err;
    }
    var users = JSON.parse(data)
    var newUser = req.body

    users.push(newUser)
    var newJSON = JSON.stringify(users)
    fs.writeFile('users.json', newJSON, function(err,data) {
      if (err) {
        throw error
      }
      else(res.redirect("/"))
    })

  })
})
/*
app.post("/suggestion", function(req, res) {
  var suggest = req.body.name
  console.log("the suggestion", suggest)
  res.json({status: 200, suggestion: ["Alexandre", "Alex"]})
})

var server = app.listen(3000, () => {
  console.log("listening")
});
*/
