$(function () {

    const socket = io('http://' + self.location.host.split(':')[0] + ':4500'); // sets the ip and port to use with socket.io

    let db = new PouchDB('products');
    let root = "img/";
    let cart = new PouchDB("cart");
    let num = 0;
let users = new PouchDB("users");
let xn = 0;





    $("#displayProducts").click(function () {
        db.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
            // handle result
            console.log(result);
            $("#productsList").append(result);


        })});

    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        // handle result
        $("#productsList").append(result);


        $("#clearProducts").click(function () {

            db.destroy();
            db = new PouchDB("products");

     db.bulkDocs(result.rows, function (err, response) {
         if (err) {
             return console.log(err);
         }
         else {
         }
     })

            $("#createRes").text("Database cleared");

        });

        $("#editProduct").click(function () {


            if ($("#prodId").val().length > 0 && $("#productName").val().length > 0
                && $("#size").val().length > 0 && $("#price").val().length > 0 && $("#priceVat").val().length > 0
                && $("#url").val().length > 0) {
                let itemId = $("#prodId").val()


                db.get(itemId).then(function (doc) {


                    doc.name = $("#productName").val();
                    doc.size = $("#size").val();
                    doc.price = $("#price").val();
                    doc.priceVAT = $("#priceVat").val();
                    doc.url = $("#url").val();


                    return db.put(doc);


                }).then(function (doc) {

                })

                $("#createRes").text("Product successfully updated");

            }
            else
            {
                $("#createRes").text("Please ensure all fields are populated");
            }
        });

$("#deleteProduct").click(function () {
    let itemId = $("#prodId").val()


    if ($("#prodId").val().length > 0 && $("#productName").val().length > 0
        && $("#size").val().length > 0 && $("#price").val().length > 0 && $("#priceVat").val().length > 0
        && $("#url").val().length > 0) {

    db.get(itemId).then(function (doc) {

        return db.remove(doc._id, doc._rev);
    });
    $("#createRes").text("Product Deleted");}
    else {
        $("#createRes").text("Please ensure all boxes are populated");
    }
});

        for (i = 0; i < result.rows.length; i++) {

            if (document.getElementById(result.rows[i].doc.name) === null) {
                let $div = $("<div>", {id: result.rows[i].doc.name, class: "gallery"});


                let $p = $("<p></p>", {id: "p" + i, class: "prodTitle"}).text(result.rows[i].doc.name);


                let $u = $("<img></img>", {id: "img" + i, src: root + result.rows[i].doc.url});


                $s = $("<select></select>", {name: "size", id: "sizes"+i});



                $o = $("<option>").val(result.rows[i].doc.name + result.rows[i].doc.size).text(result.rows[i].doc.size);


                let $b = $('<input type="button" value="Add to cart" id="k" />');

                let $bb = $("<input></input>" , {type: "button" , id:"addBtn" + i, value:"Add to cart"});
                $s.append($o);
                $div.append($p);
                $div.append($u);

                $div.append($("<p></p>", {id: "price" + i, class: "selSize"}).text("Select size"));


                $div.append($s);
                $div.append($bb);
                $("#container").append($div);


$("#addBtn" + i).click(function () {

   //get the current selected size
    //get the corresponding object

    numerator = this.id.slice(-1);

    let n = ($("#p" + numerator).text());
    let c = $("#sizes" + numerator);
    let e = c.find(":selected").text();


    let r = n + e;


    db.get(numerator).then(function (doc) {
num++;
        let newCartProd = {

            "_id":num + "id",
            "name": doc.name,
            "size":doc.size,
            "price":doc.price
        }

        cart.put(newCartProd).then(function (doc) {


        });




        //onload of checkout page add (CART) array to page
    }).catch(function (err) {
        console.log(err);

    })
})






            } else {
                console.log("category alread created");

                $div = document.getElementById(result.rows[i].doc.name);


let n = $div.children[0].id.slice(-1);

                $s = document.getElementById("sizes"+n);
                $div.append($s);
               // $("#container").append($div);
                $s.add(new Option(result.rows[i].doc.size,result.rows[i].doc.name + result.rows[i].doc.size ))
            }

        }

    }).catch(function (err) {
        console.log(err);
    });




    $("#submitMessage").click(function () {

        var name = ($("#name").val());
        var number = ($("#number").val());
        var email = ($("#email").val());
        var message = ($("#message").val());

        console.log("Name: " + name);
        console.log("Number: " + number);
        console.log("Email: " + email);
        console.log("Message: " + message);

        $("input[type=text]").each(function () {
            $(this).val("");
        });

        $("#message").val("");

        $("#submitResponse").text("Thank you for your message " + name + ", we will reply shortly!");


    })

    let username = "admin";
    let pass = "pass";
    let successfulLogin = 0;

    $("#loginAdmin").click(function () {

        if (($("#adminPass").val() == pass) && ($("#adminName").val() == username)) {


            successfulLogin = 1;
            $("#loginRes").css("color", "black");
            $("#loginRes").text("Login Succesful! - Opening Admin portal now");
            setTimeout(loadAdmin, 3000);

        } else ($("#loginRes").text("Login Unsuccessful - Please try again"))


    })

    function loadAdmin() {
        console.log("loading now");
        $("#login").css("display", "none");
        $("#products").css("display", "inline");

    };

    let id = 0;

    $("#addProduct").click(function () {


        //  if ($("#prodId").val().length > 0 + $("#productName").val().length > 0 +  $("#size").val().length > 0){


        if ($("#prodId").val().length > 0 && $("#productName").val().length > 0
            && $("#size").val().length > 0 && $("#price").val().length > 0 && $("#priceVat").val().length > 0
            && $("#url").val().length > 0) {


            let newProduct = {
                "_id": $("#prodId").val(),
                "name": $("#productName").val(),
                "size": $("#size").val(),
                "price": $("#price").val(),
                "priceVAT": $("#priceVat").val(),
                "url": $("#url").val()

            }


        db.put(newProduct).then(function (doc) {
            console.log(doc);
            id++;

            if (doc.ok === true) {
                $("#createRes").text("Product Created");
            }

        }).catch(function (err) {

            console.log(err);
            $("#createRes").text("Error: " + err.message + "  - Unable to create product!");

        })


    }
        else ($("#createRes").text("Please enter a value into each field"))
    });

    if ($("body").is(".pageType")){
//onload of checkout page



        let t = 0;

        cart.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {








            for (i = 0; i < result.rows.length; i++){

                let $div = $("<div>" , {id: "div" + result.rows[i].id, class:"cartRow"});


                let $p = $("<p></p>", {id: "nameP" + i}).text(result.rows[i].doc.name);
                let $p1 = $("<p></p>", {id: "sizeP" + i}).text(result.rows[i].doc.size);
                let $p2 = $("<p></p>", {id: "priceP" + i}).text(result.rows[i].doc.price);

                let $b = $("<button></button>", {id: "b" + result.rows[i].id}).text("remove from cart");


t += parseInt(result.rows[i].doc.price);


                $div.append($p);
                $div.append($p1);
                $div.append($p2);
                $div.append($b);

                $("#cartDiv").append($div);

                $("#b" + result.rows[i].id).click(function () {

                    $("#div" + this.id.substring(1)).remove();

                    cart.get(this.id.substring(1)).then(function (doc) {
                        console.log(doc.name + " removed");


                        //append total cost here
                        t -= doc.price;

                        $("#totalCost").text("£" + t);

                        return cart.remove(doc._id, doc._rev);
                    });

                })




            }


            $("#checkOrder").click(function () {

                //turn a socket on - send every bit of info to the server


                if ( $("#name").val().length > 0 && $("#number").val().length > 0 && $("#email").val().length
                > 0 && $("#address").val().length > 0 && $("#postcode").val().length > 0) {


                    console.log(result.rows.length);

                    if (result.rows.length > 0) {


                        let newCart = [];


                        for (i = 0; i < result.rows.length; i++) {

                            let cartObj = {

                                name: result.rows[i].doc.name,
                                size: result.rows[i].doc.size,
                                price: result.rows[i].doc.price

                            }

                            newCart.push(cartObj)

                        }


                        let newOrder = {

                            _id: $("#name").val() + xn,
                            name: $("#name").val(),
                            number: $("#number").val(),
                            email: $("#email").val(),
                            address: $("#address").val(),
                            postcode: $("#postcode").val(),

                        }

                        xn++;

                        try {

                            $("#name").val("");
                            $("#number").val("");
                            $("#email").val("");
                            $("#address").val("");
                            $("#postcode").val("");

                            users.put(newOrder);
                            $(".cartRow").remove();


                            cart.destroy();
                            cart = new PouchDB('cart');

                            $("#totalCost").text("£0");


                        } catch (err) {
                            console.log(err);
                        }

                        users.allDocs({
                            include_docs: true,
                            attachments: true
                        }).then(function (result) {
                            console.log(result)
                            // handle result
                        })


                        socket.emit('new-order', {
                            name: newOrder.name,
                            number: newOrder.number,
                            email: newOrder.email,
                            address: newOrder.address,
                            postcode: newOrder.postcode,
                            cart: newCart,
                            totalPrice: t
                        });
                    }

                    else {
$("#resP").text("Cart cannot empty");
                    }



                    } else
                    $("#resP").text("user details cannot be empty");


                 })


            $("#cancelOrder").click(function () {
                $(".cartRow").remove();
                cart.destroy();
                cart = new PouchDB("cart");

                $("#totalCost").text("£0");



            })
           $("#totalCost").text("£" + t);

        });



    }

    socket.on('order', (order) => {
if (document.getElementById("orderDiv") === null){
        let $div = $("<div>" , {id: "orderDiv"});
        $div.append($("<p></p>", {id: "notify"}).text("ONE USER JUST ORDERED A PRODUCT"));

        $(".header").prepend($div);
}
    })

socket.emit("connected");


socket.on("gotConnection", (res) => {


    let $dov = $("<div>", {id: "connectionDiv"});
    $dov.append($("<p></p>", {id:"connectCount"}).text(res.num + " user(s) connected!"))

    $("body").append($dov);

    })

    suite("hello", function () {


        test("hello", function () {

            console.log("o");
        })

    })



});


