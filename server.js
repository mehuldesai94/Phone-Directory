const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require('body-parser');


const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: "./public/photos",
    filename: function(req, file, cb){
        cb(null, Date.now()+ path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

app.get("/", (req, res)=>{
  //  res.send("Mehul, You can do it...");
  res.sendFile(path.join(__dirname, "/views/contact.html"));
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
})

app.use((req, res)=>{
    res.status(404).send("Page Not Found");
})

app.post("/register-user", upload.single("photo"), (req, res) => {
    const formData = req.body;
    const formFile = req.file;
  
    const dataReceived = "Your submission was received:<br/><br/>" +
      "Your form data was:<br/>" + JSON.stringify(formData) + "<br/><br/>" +
      "Your File data was:<br/>" + JSON.stringify(formFile) +
      "<br/><p>This is the image you sent:<br/><img src='/photos/" + formFile.filename + "'/>";
    res.send(dataReceived);
  });
  

function onHttpStart(){
    console.log("Jay Swaminarayana");
    console.log("Express http server listing on: " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);
