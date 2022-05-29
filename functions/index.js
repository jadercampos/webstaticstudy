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
        convenios.push(new Convenio(convenio.nome, convenio.imagem, convenio.link));
      });
      return response.status(200).send(convenios);     
    });
  });
});

class Veterinario {
  constructor(nome, imagem, crmv, especialidades, facebook, instagram, linkedin) {
      this.nome = nome;
      this.imagem = imagem;
      this.crmv = crmv;
      this.especialidades = especialidades;
      this.facebook = facebook;
      this.instagram = instagram;
      this.linkedin = linkedin;
  }
}
exports.getVeterinarios = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const db = admin.firestore();
    var veterinarios = [];
    db.collection("veterinarios").orderBy("nome", "asc").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        veterinario = doc.data();
        veterinarios.push(new Veterinario(veterinario.nome, veterinario.imagem, veterinario.crmv, veterinario.especialidades, veterinario.facebook, veterinario. instagram, veterinario.linkedin));
      });
      return response.status(200).send(veterinarios);     
    });
  });
});

class Campanha {
  constructor(titulo, imagem, diasSemana, ativa) {
      this.titulo = titulo;
      this.imagem = imagem;
      this.diasSemana = diasSemana;
      this.ativa = ativa;
  }
}

exports.getCampanha = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const db = admin.firestore();
    let hoje = new Date().getDay();
    var campanhas = [];
    db.collection("campanhas").where("ativa", "==", true).where("diasSemana", "array-contains", hoje).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let campanha = doc.data();
        campanhas.push(new Campanha(campanha.titulo, campanha.imagem, campanha.diasSemana, campanha.ativa));
      });
      return response.status(200).send(campanhas[Math.floor(Math.random()*campanhas.length)]);     
    });
  });
});



