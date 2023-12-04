import nodemailer from "nodemailer";

interface SendEmailDto {
  to: string;
  subject: string;
  html: string;
}

export default class NotificationLib {
  static sendEmail(data: SendEmailDto) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NOTIFICATION,
        pass: process.env.EMAIL_NOTIFICATION_PASSWORD,
      },
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: `Answerhub <${process.env.EMAIL_NOTIFICATION}>`,
      to: data.to,
      subject: data.subject,
      html: data.html,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        return info.response;
      }
    });
  }
}
