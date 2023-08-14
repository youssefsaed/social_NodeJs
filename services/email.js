import nodemailer from 'nodemailer'

export const sendEmail = async ({ to = '', html = '', subject = '' }) => {
  let transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: 'youssef.saed.iti@gmail.com', // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'youssef.saed.iti@gmail.com', // sender address
    to, // list of receivers
    subject, // Subject line
    // text: "Hello world?", // plain text body
    html  // html body
  });

  if (info.accepted.length) {
    return true
  }
  return false
}
