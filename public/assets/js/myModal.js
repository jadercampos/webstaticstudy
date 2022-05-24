
function ShowMyModal(titulo, mensagem){
    $('#MyModalTitle').html(titulo);
    $('#MyModalMessage').html("<h6>" + mensagem + "</h6>");
    $('#myModal').modal("show");
}