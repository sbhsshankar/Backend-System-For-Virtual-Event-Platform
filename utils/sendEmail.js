const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
        user: 'your_emailid@gmail.com',
        pass: 'your_email_password'
    }
});

const sendEmail = (to, subject, text) => {
    return transporter.sendMail ({
        from: 'your_emailid@gmail.com',
        to,
        subject,
        text
    });
};

module.exports = {sendEmail};