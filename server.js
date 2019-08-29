const express = require("express");
const path = require("path");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Jay Swaminarayana");
    console.log("Express http server listing on: " + HTTP_PORT);
}

app.get("/", (req, res)=>{
    res.send("Mehul, You can do it...");
})

app.get("/about", (req, res)=>{
    res.sendFile(path.join(__dirname, "/views/about.html"));
})

app.listen(HTTP_PORT, onHttpStart);
