const veterinariosTemplate = document.getElementById('veterinariosTemplate');
const veterinariosPlaceholder = document.getElementById('veterinariosPlaceholder');

window.addEventListener('load', function() {
    ObtemVeterinarios();
});

function ObtemVeterinarios(){
    //fetch('http://localhost:5001/webstaticstudy-cda1c/us-central1/getVeterinarios')
    fetch('https://us-central1-webstaticstudy-cda1c.cloudfunctions.net/getVeterinarios', {cache: "no-store"})
        .then(resVet => {
            return resVet.json();
        })
        .then(veterinarios => {
            veterinarios.forEach(vet => {
                AddVet(vet);
            });
        })
}

function AddVet(vet){
    const cardVet = veterinariosTemplate.content.cloneNode(true);
    let especialidades = "";
    cardVet.querySelector('.nomeVet').innerHTML = vet.nome;
    cardVet.querySelector('.crmvVet').innerHTML = vet.crmv;
    cardVet.querySelector('.imgVet').src = vet.imagem;
    cardVet.querySelector('.imgVet').alt = vet.nome;
    // cardVet.querySelector('.facebook').href = vet.facebook;
    // cardVet.querySelector('.instagram').href = vet.instagram;
    // cardVet.querySelector('.linkedin').href = vet.linkedin;
    vet.especialidades.forEach(especialidade => {
        especialidades += "<li>"+ especialidade + "</li>" 
    });
    cardVet.querySelector('.especialidadesVet').innerHTML = especialidades;
    veterinariosPlaceholder.append(cardVet);
}