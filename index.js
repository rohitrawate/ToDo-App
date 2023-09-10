
const express = require('express');   //require the just installed express app
var bodyParser = require("body-parser");

const app = express(); //then we call express
const port = 3000;

app.use(express.static("public" ) );
app.use( bodyParser.urlencoded( { extended: true} ));
// app.use(bodyParser.json());

app.set('view engine', 'ejs');    // set up the template engine 

//   -*-*-*-*-*-  Adding new Task -*-*-*-*-*-
//the task array with initial placeholders for added task
// var task = [ "buy stocks" , "practise with nodejs" ];  // Added Task with values
var task = [ ]; 

const user = {
  firstName: 'Rohit',
  lastName: 'Rawate',
}

// function alert() {
//   alert("Please enter> the username. Can’t be blank or empty !!!");
//   return;
// }

app.post('/addtask', function( req, res ) {   console.log( 'Post /addtask called :');
  var newtask = req.body.newtask;
  // if( newtask == null || newtask == "") {
  //   alert("Please enter> the username. Can’t be blank or empty !!!");
  // }

  // add new task from the post route into the array
  task.push(newtask);
  console.log(task);
  // res.render('pages/addtask')      // after adding task go back to route
  res.redirect("/");
});

//render the ejs and display added task, task(index.ejs) = 
// task(array)
// console.log("task(array)", task(array));

//   -*-*-*-*-*-  Completed Task -*-*-*-*-*- $$$$$$$$$$$$%%%%%%%%%%%%
// var complete = ["finish jquery"];      // completed task array with initial placeholders for removed task
var complete = ["Spring Login Project"];

app.post( "/removetask", function(req, res) {
  console.log("/removetask called : ");
  var completeTask = req.body.check;
   
  //check for the "typeof" the different completed task, then add into the complete task
  if ( typeof completeTask === "string") {
    complete.push(completeTask);
    //check if the completed task already exist in the task when checked, then remove using the array splice method
    task.splice( task.indexOf(completeTask), 1 );

  } else if( typeof completeTask ==="object") {
    for ( var i=0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice( task.indexOf(completeTask[i]), 1);
    }
  }
    res.redirect("/");

});


app.get( '/', function( req, res) {
  
  res.render('pages/index' , { obj: user, task: task, complete: complete });  // when we visit the root URL express will respond with this page
  // console.log( complete);
});

app.get( "/pages/addtask.ejs", function(req,res) {
   res.render("pages/addtask")
})

//takes us to the root(/) URL
// app.get('/', function (req, res) {
// //when we visit the root URL express will respond with 'Hello World'
//   res.send('Hello World!');
// });

//the server is listening on port 3000 for connections
app.listen( port , function () {
  console.log(`App listening at port ${port}`)
});
