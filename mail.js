const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

exports.sendMail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            html,
        });
    } catch (error) {
        throw error;
    }
};

exports.initMail = async () => {
    try {
        const verif = await transporter.verify();
        if (verif) {
            console.log('Mail server is ready to take our messages');
        }
    } catch (error) {
        throw error;
    }
};
