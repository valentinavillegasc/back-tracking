const nodemailer = require("nodemailer");
const { MAIL, MAIL_PASSWORD } = process.env;
// Configura el servicio de correo electrónico (en este caso, se usa Gmail como ejemplo)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL,
    pass: MAIL_PASSWORD,
  },
});

const sendConfirmationEmail = (email, confirmationToken) => {
  // Construye el enlace de confirmación
  const confirmationLink = `http://localhost:3000/confirm/${confirmationToken}`;

  // Configura el contenido del correo electrónico
  const mailOptions = {
    from: `Read tracker <${MAIL}>`,
    to: email,
    subject: "Email confirmation",
    text: `Please confirm your email with this link: ${confirmationLink}`,
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado:", info.response);
    }
  });
};

module.exports = sendConfirmationEmail;
