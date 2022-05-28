function ShowMyModal(titulo, mensagem){
    $('#MyModalTitle').html(titulo);
    $('#MyModalMessage').html("<h6>" + mensagem + "</h6>");
    $('#myModal').modal("show");
    $('.modal-footer').removeClass('d-none')
}
window.addEventListener('load', function() {
    var d = new Date();
    if (d.getDay() == 6) {
        ShowCampanha();
    }
});

function ShowCampanha(){
    $('#MyModalTitle').html("Sábado é dia de Vacina!");
    var texto = "<img width='470px' src='assets/img/campanhas/sabadoVacinas.webp' /> <br />";
    texto += "<a style='text-align:center; color:#fff; border-color:#fff; margin: 10px 20px 10px 90px;' href='https://api.whatsapp.com/send/?phone=%2B5511978285612&text=Ol%C3%A1%0DEu+gostaria+de+agendar+uma+consulta%21&app_absent=0' target='_blank' class='btn btn-common-wa btn-border btn-effect'><i class='lni-phone-handset'></i>&nbsp; Agende uma consulta</a>";
    $('#MyModalMessage').html(texto);
    $('#myModal').modal("show");
    $('.modal-footer').addClass('d-none')
}