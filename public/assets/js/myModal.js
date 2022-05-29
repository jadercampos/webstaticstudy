function ShowMyModal(titulo, mensagem){
    $('#MyModalTitle').html(titulo);
    $('#MyModalMessage').html("<h6>" + mensagem + "</h6>");
    $('#myModal').modal("show");
    $('.modal-footer').removeClass('d-none')
}
window.addEventListener('load', function() {
    ShowCampanha();
});

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

class Campanha {
    constructor(titulo, imagem, diasSemana, ativa) {
        this.titulo = titulo;
        this.imagem = imagem;
        this.diasSemana = diasSemana;
        this.ativa = ativa;
    }
  }

function ShowCampanha(){

    //fetch('http://localhost:5001/webstaticstudy-cda1c/us-central1/getCampanha')
    fetch('https://us-central1-webstaticstudy-cda1c.cloudfunctions.net/getCampanha', {cache: "no-store"})
        .then(resCampanha => {
            return resCampanha.json();
        })
        .then(campanha => {
            $('#MyModalTitle').html(campanha.titulo);
            let texto = "<img width='100%' src='" + campanha.imagem + "' /> <br />";
                texto += "<a style='text-align:center; color:#fff; border-color:#fff; margin: 10px 20px 10px 90px;' href='https://api.whatsapp.com/send/?phone=%2B5511978285612&text=Ol%C3%A1%0DEu+gostaria+de+agendar+uma+consulta%21&app_absent=0' target='_blank' class='btn btn-common-wa btn-border btn-effect'><i class='lni-phone-handset'></i>&nbsp; Agende uma consulta</a>";
                $('#MyModalMessage').html(texto);
                $('.modal-footer').addClass('d-none');
                sleep(1000).then(() => {
                    $('#myModal').modal("show");
                });
        });
}