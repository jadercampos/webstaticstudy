
const template = document.getElementById('list-item-template');
const contentPlaceholder = document.getElementById('convenioPlaceholder');
const button = document.getElementById('add-item');

class Pessoa {
    constructor(nome, cpf) {
        this.nome = nome;
        this.cpf = cpf;
    }
}

window.addEventListener('load', function() {
    ObtemConvenios();
});

function ObtemConvenios(){
    fetch('http://localhost:5001/webstaticstudy-cda1c/us-central1/getConvenios')
    // fetch('https://us-central1-webstaticstudy-cda1c.cloudfunctions.net/getConvenios')
        .then(res => {
            return res.json();
        })
        .then(convenios => {
            convenios.forEach(convenio => {
                AddElemento(convenio);
            });
        })
}

function AddElemento(convenio){
    const cardConvenio = template.content.cloneNode(true);
    cardConvenio.querySelector('.nomeConvenio').innerText = convenio.nome;
    cardConvenio.querySelector('.imagem').src = convenio.imagem;
    cardConvenio.querySelector('.link').href = convenio.link;
    cardConvenio.querySelector('.link').alt = convenio.nome;
    contentPlaceholder.append(cardConvenio);
}