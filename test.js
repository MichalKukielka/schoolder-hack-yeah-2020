let mailContent = ''

const questions = [{
    type: 'ABCD',
    content: 'Poka dupe',
    A: 'Tak',
    B: 'Tak',
    C: 'Tak',
    D: 'Nie',
    Correct: 'Nie'
}]

if (questions[0].type === 'ABCD') {
    let scaffold = `
    <div>${questions[0].content}</div>
    <div class="form-check">
        <input class="form-check-input" type="radio">
        <label>
            ${questions[0].A}
        </label>
    </div></br>
    <div class="form-check">
        <input class="form-check-input" type="radio">
        <label>
            ${questions[0].B}
        </label>
    </div></br>
    <div class="form-check">
        <input class="form-check-input" type="radio">
        <label>
            ${questions[0].C}
        </label>
    </div></br>
    <div class="form-check">
        <input class="form-check-input" type="radio">
        <label>
            ${questions[0].D}
        </label>
    </div></br>

    `
    console.log(scaffold)
}


unction parse(text, list) {
    let i;
    let rightIdx;
    for (i = 1; i <= Object.keys(list).length; i++) {
        if (text.slice(text.indexOf('' + i + ')') + 2, i == Object.keys(list).length ? text.length : text.indexOf('' + (i + 1) + ')') - 1).trim().replace(/\s/g, '') == list[i].trim().replace(/\s/g, '')) {
            console.log("OK");
        } else {
            console.log("MISTAKE");
        }
    }

    text.indexOf('' + i + ')');
}

$(document).ready(function() {
    let list = { 1: "Ala ma kota", 2: "C", 3: "304" };
    let text = "1) Ala ma kota 2) heh 3) 304";

    parse(text, list);
});













"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        name: "interia.pl",
        host: "poczta.interia.pl",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "schoolder@interia.pl", // generated ethereal user
            pass: "" // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'schoolder@interia.pl', // sender address
        to: "schoolder@interia.pl", // list of receivers
        subject: "Hello", // Subject line
        //text: "Hello world?", // plain text body
        html: `<h2>Homework 03.04</h2> 

    <textarea id="w3mission" rows="4" cols="50">

    </textarea>
    <a class="email" id="email" title="Send" href="mailto:?subject=Interesting%20information&amp;body=I thought you might find this information interesting:%20%0d%0a"+window.location">Email</a>
    
    `
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log(info);
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);