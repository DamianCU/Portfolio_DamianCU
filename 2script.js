// Función para cambiar el idioma del portfolio
function setLanguage(lang){
    const buttons= document.querySelectorAll('.language-selector button');

    //Eliminar la clase 'active de todos los botones
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Añadir la clase 'active' al botón clicado
    const activeButton = document.querySelector(`.language-selector button[lang="${lang}"]`);
    if(activeButton){
        activeButton.classList.add('active');
    };
};

// Cambiar el idioma al clicar en uno de los botones
document.querySelectorAll('.language-selector button').forEach(button => {
    button.addEventListener('click', function () {
        const lang = this.getAttribute('lang');
        setLanguage(lang);
    });
});


// Función para mostrar/ocultar el menú desplegable al hacer clic en el icono del menú
function toggleMenu() {
    const navBar = document.querySelector('.navBar');
    navBar.classList.toggle('active'); // Muestra/oculta la clase 'active' del navBar
}

// Al hacer clic en el icono del menú, se despliega/oculta el menú
const menuIcon = document.getElementById('menu-icon');
menuIcon.addEventListener('click', toggleMenu);

// Ocultar el menú cuando el cursor sale del área del menú y del icono del menú
const navBar = document.querySelector('.navBar');
const header = document.querySelector('header'); // Para incluir tanto el icono como el navBar

header.addEventListener('mouseleave', function(event) {
    // Verificamos que el evento se dispare cuando el cursor no esté sobre el menú o el icono
    if (!navBar.contains(event.relatedTarget) && !menuIcon.contains(event.relatedTarget)) {
        navBar.classList.remove('active'); // Escondemos el menú si no estamos en el navBar ni en el menú
    }
});

// Ocultar el menú al hacer clic en un enlace dentro del menú y llevarnos a la sección indicada
const navLinks = document.querySelectorAll('.navBar a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.navBar').classList.remove('active'); // Escondemos el menú
    });
});



/* Animación molona del h3 del home */
const words = ["Frontend Developer", "Backend Developer in progress", "3D Artist", "Video Games Developer in Progress"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.text-animation span');
const typingSpeed = 50; // Velocidad de escribir
const deletingSpeed = 25; // Velocidad de borrar
const delayBetweenWords = 2000; // Pausa entre palabras

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Si está borrando, reduce el número de caracteres visibles
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            // Cuando la palabra ha sido completamente borrada, pasa a la siguiente palabra
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Cambia a la siguiente palabra
        }
    } else {
        // Si está escribiendo, aumenta el número de caracteres visibles
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            // Pausa cuando la palabra está completamente escrita
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenWords); // Espera antes de empezar a borrar
            return;
        }
    }

    // Ajustar la velocidad dependiendo si está escribiendo o borrando
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
}

// Inicia la animación
typeEffect();