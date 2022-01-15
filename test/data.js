//const assert = require('chai').assert;
const chai = require('chai');

let jsdom = require("jsdom");
$ = require("jquery")(new jsdom.JSDOM().window);
let io = require('socket.io');
const puppeteer = require("puppeteer");


let PouchDB = require('pouchdb');


const index = require("../public/js/index");


suite("unitTesting", function () {


    test("Check suite" , function () {
        let i = 10;
        chai.assert.equal(i, 10);
    })


test ("addToDatabase" , function () {

    doc1 = {
        _id: "5",
        name: "test",
        price: "55",
        size: "6 x 6",
        url: "fakeUrl.png",
        priceVat: "70",
    }

    let testDb = new PouchDB('test');
    testDb.put(doc1);

    testDb.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        // handle result

        //check doc has been appended at the end of testDb database
        chai.assert.equals(result.rows[result.rows.length -1].doc.name, "test", "name does not match - database error")
    })
})

    test ("test-get-title", function () {
        const puppeteer = require("puppeteer");

        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("http://localhost:3000/contact.ejs");

            title = await page.evaluate(() => {
                return document.querySelector("#title").textContent;
            });

            console.log(title);
            chai.assert.equal(title, "Martyn's Fencing Supplies and Installation",  "Connection to server not established");
            await browser.close();
        })();
});

    test ("test-contact-us-form" , function () {

        let puppeteer = require("puppeteer");

        (async () => {


            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            await page.goto("http://localhost:3000/contact.ejs");
            await page.waitForSelector("input#name");
            await page.type('input#name', "testName");
            await page.type('input#number', "testNumber");
            await page.type('input#email', "testEmail");
            await page.type('#message', "testMessage");

            await page.click('button[id=submitMessage]');

            res = await page.evaluate(() => {
                return document.querySelector("#submitResponse").textContent;
            });


            console.log(res);

            chai.assert.equal(res, "Thank you for your message testName, we will reply shortly!", "issue sending message");

        })();

    });

    test ('login-and-create-product', function () {

        let puppeteer = require("puppeteer");

        (async () => {
            console.log("hello");
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            await page.goto("http://localhost:3000/admin.ejs");
            await page.waitForSelector("input#adminName");

            await page.type('input#adminName', "admin");
            await page.type('input#adminPass', "pass");

            await page.click('button[id=loginAdmin]');

        })
    })










    });






