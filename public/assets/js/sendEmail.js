document.getElementById("send").addEventListener("click", validateForm);
function validateForm() {
    //gets the name
  let nome = document.getElementById("nome").value;
  //gets the email
  let email = document.getElementById("email").value;
  //gets the email
  let assunto = document.getElementById("assunto").value;
  //gets the message
  let mensagem = document.getElementById("mensagem").value;

  // //checks if all fields have been filled before sending message.
   if (nome.trim() == "" || email.trim() == "" || assunto.trim() == "" || mensagem.trim() == "") {
    ShowMyModal("Atenção!", "Você deve preencher todos os campos do formulário!");
   } else {
    sendMessage(nome, email, assunto, mensagem);
   }
}
//sends information to firebase
function sendMessage(nome, email, assunto, mensagem) {
 //var msg =  "http://localhost:5001/webstaticstudy-cda1c/us-central1/sendMail?nome=" +
  var msg =  "https://us-central1-webstaticstudy-cda1c.cloudfunctions.net/sendMail?nome=" +
    nome +
    "&email=" +
    email +
    "&assunto=" +
    assunto +
    "&mensagem=" +
    mensagem +
    "";
    fetch(msg).
    then(res => {
      ShowMyModal("Obrigado pelo contato!!", "Mensagem enviada com sucesso!<br /><br />Em breve entraremos em contato.<br /><br /><br />Obrigado!")
      document.getElementById("nome").value = "";
      document.getElementById("email").value = "";
      document.getElementById("assunto").value = "";
      document.getElementById("mensagem").value = "";})
    .catch(err => ShowMyModal("Atenção!", "Ocorreram erros ao enviar a sua mensagem!<br /><br />Por favor, tente novamente mais tarde!"));

}