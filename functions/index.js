const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
const config = functions.config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

exports.sendMail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const nome = "<strong>Nome: </strong><br />" + request.query.nome;
    const email = "<strong>E-mail: </strong><br />" + request.query.email;
    const assunto = "<strong>Assunto: </strong><br />" + request.query.assunto;
    const mensagem = "<strong>Mensagem: </strong><br />" + request.query.mensagem;
    const mailOptions = {
      from: "Contato - VIDAS <contato@vetvidas.com.br>", 
      to: "contato@vetvidas.com.br", 
      subject: "[SITE VIDAS] - Formulário de Contato", 
      html: nome + email + assunto + mensagem
    };
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        functions.logger.log(erro.toString());          
        return response.send(erro.toString());
      }
        functions.logger.log("Messagem Enviada");
        return response.send("Messagem Enviada");
     });
   });
});