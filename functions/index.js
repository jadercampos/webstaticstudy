const functions = require("firebase-functions");
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
const config = functions.config();

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

class MailMessage {
  constructor(remetente, destinatario, nome, email,assunto, mensagem) {
    this.remetente = remetente;
    this.destinatario = destinatario;  
    this.nome = nome;
    this.email = email;
    this.assunto = assunto;
    this.mensagem = mensagem;
    this.mailOptions = {
      from: remetente, 
      to: destinatario, 
      subject: assunto, 
      html: this.montaMensagem(this.mensagem),
    };
  }
  montaMensagem(mensagem){
    this.mensagem = "<h2><strong>Assunto: </strong>" + this.assunto + "</h2><br />";
    this.mensagem += "<strong>Nome: </strong>" + this.nome + "<br />";
    this.mensagem += "<strong>E-mail: </strong>" + this.email + "<br />";
    this.mensagem += "<strong>Mensagem: </strong>" + mensagem;
    return this.mensagem;
  }
  getTransporter(){
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.mail.user,
        pass: config.mail.pass,
      },
    });
  }
}

exports.sendMail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const remetente = "[SITE VIDAS] - Formulário de Contato <contato@vetvidas.com.br>";
    const destinatario = "Contato VIDAS <contato@vetvidas.com.br>";
    let msg = request.query;
    const mailMensagem = new MailMessage(remetente, destinatario, msg.nome, msg.email, msg.assunto, msg.mensagem);
    return mailMensagem.getTransporter().sendMail(mailMensagem.mailOptions, (erro, info) => {
      if (erro) {
        functions.logger.log(erro.toString());
        return response.send(erro.toString());
      }
        functions.logger.log("Messagem Enviada", info);
        return response.send("Messagem Enviada");
     });
   });
});

class Convenio {
  constructor(nome, imagem, link) {
      this.nome = nome;
      this.imagem = imagem;
      this.link = link;
  }
}
exports.getConvenios = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const db = admin.firestore();
    var convenios=[];
    db.collection("convenios").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        convenio = doc.data();
        convenios.push(new Convenio(nome=convenio.nome, imagem=convenio.imagem, link=convenio.link));
      });
      return response.status(200).send(convenios);     
    });
  });
});



