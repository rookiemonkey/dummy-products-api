const nodemailer = require('nodemailer');

const toEmail = async (recipient, subject, emailBody) => {

    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAILUN,
            pass: process.env.GMAILPW
        }
    });

    const mailOptions = {
        subject: subject,
        to: recipient,
        text: emailBody
    }

    await smtpTransport.sendMail(mailOptions);

}

module.exports = toEmail;