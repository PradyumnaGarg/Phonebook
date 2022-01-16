const nodemailer = require('nodemailer');

const urlForFrontEnd = 'http://localhost:3000/auth/reset-password/';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phonebookdev@gmail.com',
    pass: 'utujcwfmgzxgeufg',
  },
});

const mailer = (mailBody) => transporter.sendMail({
  from: '"Phonebook" <phonebookdev@gmail.com>',
  to: mailBody.username,
  subject: 'Reset Password Link',
  html: `
        <html>
            <body>
                <table>
                    <tr>
                        <td>Reset your account password</td>
                    </tr>
                    <tr>
                        <td>Reset password link - ${urlForFrontEnd}${mailBody._id}</td>
                    </tr>
                    <tr>
                        <td>If not requested by you, you can safely ignore this email.</td>
                    </tr>
                </table>
            </body>
        </html>
        `,
});

module.exports = {
  mailer,
};
