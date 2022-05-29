const conveniosTemplate = document.getElementById('conveniosTemplate');
const conveniosPlaceholder = document.getElementById('conveniosPlaceholder');

window.addEventListener('load', function() {
    ObtemConvenios();
});

function ObtemConvenios(){
    //fetch('http://localhost:5001/webstaticstudy-cda1c/us-central1/getConvenios')
    fetch('https://us-central1-webstaticstudy-cda1c.cloudfunctions.net/getConvenios', {cache: "no-store"})
        .then(resConvenio => {
            return resConvenio.json();
        })
        .then(convenios => {
            convenios.forEach(convenio => {
                AddConvenio(convenio);
            });
        })
}

function AddConvenio(convenio){
    const cardConvenio = conveniosTemplate.content.cloneNode(true);
    cardConvenio.querySelector('.nomeConvenio').innerText = convenio.nome;
    cardConvenio.querySelector('.imagem').src = convenio.imagem;
    cardConvenio.querySelector('.link').href = convenio.link;
    cardConvenio.querySelector('.link').alt = convenio.nome;
    conveniosPlaceholder.append(cardConvenio);
}