var express = require('express');
var app = express();
var server = require('http').createServer(app);
const port = 3000;
let http = require("http");
socketPort = 4500




const io = require('socket.io')(socketPort, {
    cors: {
        // Must allow cross origin resource sharing (otherwise server won't accept traffic from localhost)
        origin: "*"
    }
});



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

app.get("/admin.ejs", (req, res) => {
    res.render("admin.ejs")
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

io.on("connection", (socket) => {


socket.on('new-order', (res) =>
    {
        console.log("⚠ NEW ORDER INCOMING....");


        console.log(res);

        socket.emit("order", {"order":"order"});


    }
)


    let connectedUsers = 0;

    socket.on("connected", (res) => {

    connectedUsers += 1;

    socket.emit("gotConnection", {"num":connectedUsers});

    });




})

//to do

//pouch db to get products - could be from a csv file?

//display products - potentially with categories?

//sort out cart funciton - add to cart if click the button etc.

//payment? how tf u gon do that? - talk about delivery in some place

// web sockets for....?

//unit test all things that handle data

// slide show of pictures on home screen

// integ testing

// usability testing




