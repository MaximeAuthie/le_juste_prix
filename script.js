// Récupération des éléments du DOM
let input                   = document.body.querySelector('#price');
let buttonTester            = document.body.querySelector('#tester');
let buttonRecommencer       = document.body.querySelector('#recommencer');
let instructionsDiv         = document.body.querySelector('#instructions');
let errorMsg                = document.body.querySelector('#error');

// Cacher le message d'erreur
errorMsg.style.display = 'none';

// Génération d'un nombre aléatoire entre 0 et 1000
let randomNumber = Math.floor(Math.random()*1000);

// Initialisation des autres variables globales
let choosenNumber   = 0;
let tryNumner       = 0;

console.log(randomNumber);

// Création de la fonction permettant de vérifier le résultat saisi
function verify (number) {
    let instruction = document.createElement('div');

    if (number < randomNumber && number > 0) {
        tryNumner += 1;
        instruction.textContent = "Essai " + tryNumner + " (" + number +") : C'est plus!";
        instruction.className = "instruction-more";
        input.value='';
        instructionsDiv.prepend(instruction);
    } else if (number > randomNumber && number < 1000) {
        tryNumner += 1;
        instruction.textContent = "Essai " + tryNumner + " (" + number +") : C'est moins!";
        instruction.className = "instruction-less";
        input.value='';
        instructionsDiv.prepend(instruction);
    } else if (number < 0) {
        errorMsg.style.display = 'block';
        input.style.border = 'solid red';
    } else if (number > 1000) {
        errorMsg.style.display = 'block';
        input.style.border = 'solid red';
    } else {
        tryNumner += 1;
        instruction.textContent = "Essai " + tryNumner + " (" + number +") : Félications! Vous venez de trouver le Juste Prix!!!";
        instruction.className = "instruction-success";
        instructionsDiv.prepend(instruction);
        input.disabled =true;
        buttonTester.disabled=true;
    }
}

// Vérification de la saisie faite par l'utilisateur avant d'appuyer sur le bouton
input.addEventListener('keyup', () => {
    if (isNaN(input.value)) {
        errorMsg.style.display = 'block';
        input.style.border = 'solid red';
    } else {
        errorMsg.style.display = 'none';
        input.style.border = '';
    }
});

// Gérer l'envoie du formulaire
buttonTester.addEventListener('click', (event) => {
    event.preventDefault();
    if (isNaN(input.value) || input.value == '') {
        errorMsg.style.display = 'block';
        input.style.border = 'solid red';
    } else {
        verify(input.value);
    }
});


// Création de la fonction permettant de réinitialiser le jeu
function retry () {
    randomNumber = Math.floor(Math.random()*1000);
    input.value='';
    input.disabled =false;
    buttonTester.disabled=false;
    instructionsDiv.innerHTML='';
}

// Gérer le click sur le bouton "recommencer"
buttonRecommencer.addEventListener('click', (event) => {
    event.preventDefault();
    retry();
});

// Ajouter la gestion des bornes min et max
