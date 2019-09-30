const express = require("express"); 

const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const messageModel = require("./models/message");
const connectionString =
 "mongodb+srv://Daizee:daiz1234@cluster0-s0l0g.mongodb.net/test?retryWrites=true&w=majority";
 mongoose.connect(
     connectionString,
     {useNewUrlParser: true, useUnifiedTopology: true},
     err => {
         console.log(err);
     }
 );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/contact-us",(req, res) => {
const message = new messageModel({
   fullname: req.body.name,
   email: req.body.email,
   message: req.body.message
});

message.save((err, doc) => {
if (err !== null) {
console.log(err);
res.send("Failed to connect us. Please try again.");
} else {
    console.log(doc);
    res.send("Thanks for reaching out. We will contact you shortly!");
}
  });
});

app.post("/login", (req, res) => {
    if(req.body.username === 'esther' && req.body.password === 'xty'){
        res.send('login successfull')
     }else{
         res.send('password or username incorrect')
     }
   
 console.log(req.body);
})
//  res.send(`username is ${req.body.username} and password is ${req.body.password}`);
// });






 //expose the app on port 3000
    
//create a default route(404)(7)
app.use("*", (req, res) => {
    res.status(404).send("<h1>404, page not found</h1>");
});
//attach the server to a port(1)
//go to the browser and type the port(2)

app.listen(3000, () => {
    console.log("server running at port 3000")
   });