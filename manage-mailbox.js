const Imap = require('imap'),
    inspect = require('util').inspect,
    mongoose = require("mongoose"),
    Mail = require('./models/mail'),
    studets = require('./students').STUDENTS,
    db = require('./students').DB;


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


const imap = new Imap({
    user: 'schoolder@interia.pl',
    password: 'konzwalony123',
    host: 'poczta.interia.pl',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false
    },
    authTimeout: 3000
});

openInbox = (cb) => {
    imap.openBox('INBOX', true, cb);
}

imap.once('ready', () => {
    openInbox((err, box) => {

        if (err) throw err;
        imap.search(['ALL', ['SINCE', 'April 02, 2020 13:00:00']], function(err, results) {
            if (err) throw err;
            var f = imap.fetch(results, {
                bodies: ['HEADER.FIELDS (FROM SUBJECT DATE)', 'TEXT'],
                struct: true
            });

            f.on('message', (msg, seqno) => {
                // console.log('Message #%d', seqno);
                const mailObject = {};
                const prefix = '(#' + seqno + ') ';
                msg.on('body', (stream, info) => {
                    // if (info.which === 'TEXT')
                    //     console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
                    let buffer = '',
                        count = 0;
                    stream.on('data', (chunk) => {
                        count += chunk.length;
                        buffer += chunk.toString('utf8');
                        // if (info.which === 'TEXT') console.log('BUFFER: ' + buffer)
                        // console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);

                        mailObject.body = buffer;

                    });
                    stream.once('end', () => {
                        if (info.which !== 'TEXT') {
                            // console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                            const head = inspect(Imap.parseHeader(buffer));
                            const subject = head.match(/subject:\s*\[\s*'.*'\s*\]/);
                            const receiveDate = head.match(/date:\s*\[\s*'.*'\s*\]/);

                            mailObject.from = head.match(/([a-zA-Z0-9._-]+@+[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)[0];
                            mailObject.subject = subject[0].slice(12, subject[0].length - 3);
                            mailObject.receiveDate = receiveDate[0].slice(9, receiveDate[0].length - 3);

                            mailObject.from = head.match(/([a-zA-Z0-9._-]+@+[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)[0];
                            mailObject.subject = subject[0].slice(12, subject[0].length - 3);
                            mailObject.receiveDate = receiveDate[0].slice(9, receiveDate[0].length - 3);
                        } else
                            console.log(prefix + 'Message [%s] Finished', inspect(info.which));
                    });
                });
                msg.once('end', () => {
                    // console.log(prefix + 'Finished');

                    console.log(mailObject.from)
                    if (studets.includes(mailObject.from)) {
                        Mail.create(mailObject, (err, mail) => {
                            if (err) {
                                console.log(err);
                            } else {

                                mail.from = mailObject.from;
                                mail.receiveDate = mailObject.receiveDate;
                                mail.subject = mailObject.subject;
                                mail.body = mailObject.body;
                                mail.save();

                            }
                        });
                    }

                });
            });
            f.once('error', (err) => {
                console.log('Fetch error: ' + err);
            });
            f.once('end', () => {
                console.log('Done fetching and saving all messages!');
                imap.end();
            });
        });
    });
});

imap.once('error', (err) => {
    console.log(err);
});

imap.once('end', () => {
    console.log('Connection ended');
});

imap.connect();
