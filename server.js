//mongodb+srv://mmdesai:Mehul9894@phonedirectorydb-ctgcd.mongodb.net/phone_directory?retryWrites=true&w=majority


//all require variables
const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
//application port
const HTTP_PORT = process.env.PORT || 8080;

var mongoose = require("mongoose");
var Schema = mongoose.Schema;



app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');




// connect to the localhost mongo running on default port 27017

mongoose.connect('mongodb+srv://mmdesai:Mehul9894@phonedirectorydb-ctgcd.mongodb.net/phone_directory?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});


var contactSchema = new Schema({
  "contactNumber": {
    "type": Number,
    "default": 0
  },
  "prefixName": String,
  "firstName" : String,
  "lastName" : String,
  "middleName" : String,
  "sufixName": String,
  "phoneNumber": String,
  "phoneType": String,
  "emailAddress":String,
  "emailType":String,
  "photo" : {data: Buffer, contentType:String}
})
var Contact = mongoose.model("contactsList", contactSchema);


//photo storage
const storage = multer.diskStorage({
    destination: "./public/photos",
    filename: function(req, file, cb){
        cb(null, Date.now()+ path.extname(file.originalname));
    }
})
const upload = multer({storage:storage});


//home path
app.get("/", (req, res)=>{
  //  res.send("Mehul, You can do it...");
  // res.sendFile(path.join(__dirname, "/views/contact.html"));
  res.render(contact);
})


//about path
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
})


//add contact page
// app.post("/register-user", upload.single("photo"), (req, res) => {
//     const formData = req.body;
//     const formFile = req.file;
  
//     const dataReceived = "Your submission was received:<br/><br/>" +
//       "Your form data was:<br/>" + JSON.stringify(formData) + "<br/><br/>" +
//       "Your File data was:<br/>" + JSON.stringify(formFile) +
//       "<br/><p>This is the image you sent:<br/><img src='/photos/" + formFile.filename + "'/>";
//     res.send(dataReceived);
//   });
  

//all contact display page
app.post("/addContact", upload.single("photo"), (req, res)=>{
  const formData = req.body;
  const formFile = req.file;
  
// create a new company
var person = new Contact({
  prefixName: (formData.prefixName),
  firstName : formData.firstName,
  lastName : formData.lastName,
  middleName : formData.middleName,
  sufixName: formData.sufixName,
  phoneNumber: formData.phoneNumber,
  phoneType: formData.phoneType,
  emailAddress: formData.emailAddress,
  emailType: formData.emailType,
  photo : {data: Buffer, contentType:formFile}
});

person.save((error, data)=>{
  if(error)
    console.log("Error is : " + error);
    else(data)
    console.log("Data save successfully !!!");
});
 // res.send("Hello mehul")
  res.render("allContacts", {data: person, layout: false});
});

app.get("/updateContact/:contactNumber", (req, res)=>{
    Contact.find({contactNumber: req.params.contactNumber}).then((person)=>{
      res.render("contact", {data: person, layout:false});
    })
})




//404 Error
app.use((req, res)=>{
  res.status(404).send("Page Not Found");
})


function onHttpStart(){
    console.log("Jay Swaminarayana");
    console.log("Express http server listing on: " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);
