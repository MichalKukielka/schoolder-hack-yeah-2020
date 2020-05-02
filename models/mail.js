const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
    from: String,
    receiveDate: String,
    subject: String,
    body: String,
});

module.exports = mongoose.model("Mail", mailSchema);