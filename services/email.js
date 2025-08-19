import nodemailer from 'nodemailer'

export const sendEmail = async (option) => {
  let transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'youssefDot', // sender address
    to: option.to, // list of receivers
    subject: option.subject, // Subject line
    // text: "Hello world?", // plain text body
    html: option.html  // html body
  });

  if (info.accepted.length) {
    return true
  }
  return false
}
