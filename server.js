const express = require('express'),
    mongoose = require("mongoose"),
    cors = require('cors'),
    Mail = require('./models/mail'),
    Homework = require('./models/homework'),
    STUDENTS = require('./students').STUDENTS,
    db = require('./students').DB;

const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

function processMails(mails, mailIdx, obj, res)
{
    let temp = mails[mailIdx].toJSON();
    var from = temp.from;
    var sub = temp.subject;
    //console.log(sub);
    Homework.find({subject: sub}, function (err, homework) {
        //console.log(sub);
        if(homework.length > 0) {
            let i = 1;
            var results = [];
            var list = {};

            let homeworkJSON = homework[0].toJSON();
            //console.log(homeworkJSON);
            for(const element of homeworkJSON.questions)
            {
                list[i] = element.correct;
                i++;
            }

            let text = temp.body;
            let howManyCorrect = 0
            let total = 0;
            for (i = 1; i <= Object.keys(list).length; i++) {
                let userAnswear = text.slice(text.indexOf('' + i + ')') + 2, i == Object.keys(list).length ? text.length : text.indexOf('' + (i + 1) + ')') - 1).trim().replace(/\s/g, '');
                if(i == Object.keys(list).length) userAnswear = userAnswear.slice(0, 1);
                
                let isOK  = 0;
                if (userAnswear == list[i].trim().replace(/\s/g, '')) isOK = 1;
                else isOK = 0;


                let userFullAnswear = "";
                if (userAnswear === "A") {
                    userFullAnswear = homeworkJSON.questions[i-1].A;
                }
                else if (userAnswear === "B") {
                    userFullAnswear = homeworkJSON.questions[i-1].B;
                }
                else if (userAnswear === "C") {
                    userFullAnswear = homeworkJSON.questions[i-1].C;
                }
                else if (userAnswear === "D") {
                    userFullAnswear = homeworkJSON.questions[i-1].D;
                }

                let correctFullAnswear = "";
                if (homeworkJSON.questions[i-1].correct === "A") {
                    correctFullAnswear = homeworkJSON.questions[i-1].A;
                }
                else if (homeworkJSON.questions[i-1].correct === "B") {
                    correctFullAnswear = homeworkJSON.questions[i-1].B;
                }
                else if (homeworkJSON.questions[i-1].correct === "C") {
                    correctFullAnswear = homeworkJSON.questions[i-1].C;
                }
                else if (homeworkJSON.questions[i-1].correct === "D") {
                    correctFullAnswear = homeworkJSON.questions[i-1].D;
                }

                if(isOK == 1) howManyCorrect++;
                total++;
                results.push({question: homeworkJSON.questions[i-1].question, answear: userFullAnswear, correct: correctFullAnswear, isCorrect: isOK});
            }

            obj.push({"from": from,"subject": sub,"results":results, score: howManyCorrect, total: total});
        }
        mailIdx++;
        //console.log(mailIdx);
        if(mails.length != mailIdx) processMails(mails, mailIdx, obj, res);
        else res.json(obj);
    });
}

app.get('/api/customers', (req, res) => {

    Mail.find({}, function (err, mails) {
        if (err) {
            console.log(err);
        } else {
            //res.json(mails);
            var obj = [];
            processMails(mails, 0, obj, res);

        }
    });

});

app.post('/api/homework', (req, res) => {

    let body = "";
    let idx = 1;
    let resp = "";
    for (const quest of req.body.questions) {
        body += idx + ") " + quest.question + "<br>A: " + quest.A + "<br>B: " + quest.B + "<br>C: " + quest.C + "<br>D: " + quest.D + "<br><br>";
        resp += idx + ") \r\n";
        idx++;
    }

    body += '<a class="email" id="email" title="Send" href="mailto:schoolder@interia.pl?subject=' + req.body.questions[0].subject + '&amp;body=' + resp + '">Wyślij odpowiedź</a>';
    body += '<br><i>Wpisz odpowiedzi A, B, C lub D</i>';

    //body += '<a class="email" title="Send" href="mailto:schoolder@interia.pl?subject:Re: ' + req.body.questions[0].subject + ';">Wyślij odpowiedź</a>'
    // create reusable transporter object using the default SMTP transport
    //console.log(req.body)
    let transporter = nodemailer.createTransport({
        name: "interia.pl",
        host: "poczta.interia.pl",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "schoolder@interia.pl",
            pass: "konzwalony123"
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: 'schoolder@interia.pl', // sender address
        to: STUDENTS, // list of receivers
        subject: req.body.questions[0].subject, // Subject line
        //text: "Hello world?", // plain text body
        html: body
    });
    console.log(info);

    let temp = req.body.questions
    let filter = {};
    filter.subject = temp[0].subject
    delete temp[0].subject
    filter.questions = temp

    Homework.create(filter, (err, homework) => {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(homework)

        }
    });

    res.send('dostalem zadanie')
});

const PORT = 5000;

app.listen(PORT, function () {
    console.log("Server is running on " + PORT + " port");
});

