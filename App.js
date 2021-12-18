var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const port = 3000;


app.listen(port, () => console.log("listening on port " + port));


app.use(express.static("public"))
app.use("/css",express.static(__dirname + "public/css"))
app.use("/js",express.static(__dirname + "public/js"))
app.use("/img",express.static(__dirname + "public/img"))

app.set("views" , "./views")
app.set("view engine" , "ejs")



app.get("", (req, res) => {
    res.render("app.ejs")
})


app.get("/about.ejs", (req, res) => {
    res.render("about.ejs")
})

app.get("/checkout.ejs",(req,res) =>{
    res.render("checkout.ejs")
})

app.get("/contact.ejs", (req, res) => {
    res.render("contact.ejs")
})

app.get("/products.ejs",(req,res) => {
    res.render("products.ejs")
})

app.get("/app.ejs",(req,res) => {
    res.render("app.ejs")
})



