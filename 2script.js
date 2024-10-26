// Arrays de palabras para la animación.
const wordsEs = [
    "Desarrollador Frontend",
    "Desarrollador Backend en progreso",
    "Artista 3D",
    "Desarrollador de Videojuegos en Progreso"
];
const wordsEn = [
    "Frontend Developer",
    "Backend Developer in progress",
    "3D Artist",
    "Video Games Developer in Progress"
];
let words = wordsEs;    // Español por defecto
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80;     // Velocidad de escritura
const deletingSpeed = 50;   // Velocidad de borrado
const delayBetweenWords = 1800;     // Pausa entre palabras

// Función para typing de la animación
function typeWords() {
    const typingElement = document.querySelector('.home-text .text-animation span');
    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentWord.substring(0, charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Pasa a la siguiente palabra
            setTimeout(typeWords, delayBetweenWords); // Pausa antes de escribir la próxima palabra
        } else {
            setTimeout(typeWords, deletingSpeed);
        }
    } else {
        charIndex++;
        typingElement.textContent = currentWord.substring(0, charIndex);
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWords, delayBetweenWords); // Pausa antes de borrar
        } else {
            setTimeout(typeWords, typingSpeed);
        }
    }
}

// Función para el cambio de idioma
function setLanguage(lang) {
    const buttons = document.querySelectorAll('.language-selector button');
    const elementsToTranslate = document.querySelectorAll('.lang');
    
    buttons.forEach(button => button.classList.remove('active'));
    const activeButton = document.querySelector(`.language-selector button[lang="${lang}"]`);
    if (activeButton) activeButton.classList.add('active');

    // Mostrar/ocultar contenido en base al idioma seleccionado
    elementsToTranslate.forEach(element => {
        element.style.display = element.classList.contains(lang) ? 'block' : 'none';
    });

    // Actualiza las palabras y reinicia la animación
    words = lang === 'es' ? wordsEs : wordsEn;
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;

    // Asegura que solo el elemento correcto tenga la clase de animación activa
    document.querySelectorAll('.home-text h3').forEach(h3 => h3.classList.remove('text-animation'));
    const activeTextAnimation = document.querySelector(`.home-text .lang.${lang} h3`);
    if (activeTextAnimation) activeTextAnimation.classList.add('text-animation');

    setTimeout(typeWords, 100); 
}

document.addEventListener('DOMContentLoaded', function() {
    typeWords();

    document.querySelectorAll('.language-selector button').forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('lang');
            setLanguage(lang);
        });
    });
});


// Función para mostrar/ocultar el menú al hacer clic en el icono del menú
function toggleMenu() {
    const navBar = document.querySelector('.navBar');
    if (navBar) {
        navBar.classList.toggle('active'); // Muestra/Oculta la clase 'active' de navBar
    }
}

// Función para ocultar el menú
function hideMenu() {
    const navBar = document.querySelector('.navBar');
    if (navBar) {
        navBar.classList.remove('active'); // Oculta el menú
    }
}

// Asegura que el icono de menú existe antes de añadir eventos
const menuIcon = document.getElementById('menu-icon');
if (menuIcon) {
    menuIcon.addEventListener('click', toggleMenu);
}

// Oculta el menú al hacer clic en un enlace dentro del menú
const navLinks = document.querySelectorAll('.navBar a');
navLinks.forEach(link => {
    link.addEventListener('click', hideMenu);
});

// Oculta el menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const navBar = document.querySelector('.navBar');
    if (navBar && navBar.classList.contains('active') && !navBar.contains(event.target) && !menuIcon.contains(event.target)) {
        hideMenu();
    }
});


let zoomLevel = 1; // Variable para controlar el zoom

function openModal(image) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    modal.style.display = "flex"; // Muestra el modal
    modalImage.src = image.src; // Asigna la fuente de la imagen al modal
    zoomLevel = 1; // Restablece el zoom al abrir el modal
    modalImage.style.transform = "scale(1)"; // Restaura la escala de la imagen
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Oculta el modal
}

// Control del zoom al hacer clic en la imagen dentro del modal
document.getElementById("modalImage").addEventListener("click", function () {
    if (zoomLevel === 1) {
        zoomLevel = 2;
        this.style.transform = "scale(2)"; // Aplica zoom
        this.style.cursor = "zoom-out"; // Cambia el cursor a zoom-out
    } else {
        zoomLevel = 1;
        this.style.transform = "scale(1)"; // Restablece el zoom
        this.style.cursor = "zoom-in"; // Cambia el cursor de nuevo a zoom-in
    }
});
