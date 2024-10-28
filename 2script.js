// Arrays de palabras para la animación
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
let words = wordsEs; // Español por defecto
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Velocidades de animación y retardo entre palabras
const typingSpeed = 80; 
const deletingSpeed = 50; 
const delayBetweenWords = 1800; 

// Animación chula ^^
function typeWords() {
    const typingElement = document.querySelector('.home-text .text-animation span');
    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentWord.substring(0, charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWords, delayBetweenWords);
        } else {
            setTimeout(typeWords, deletingSpeed);
        }
    } else {
        charIndex++;
        typingElement.textContent = currentWord.substring(0, charIndex);
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWords, delayBetweenWords);
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

// Evento para inicializar animación y eventos de idioma
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
        navBar.classList.toggle('active'); 
    }
}

// Función para ocultar el menú
function hideMenu() {
    const navBar = document.querySelector('.navBar');
    if (navBar) {
        navBar.classList.remove('active'); 
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

let zoomLevel = 1; 
let isDragging = false; 
let startX, startY, initialX, initialY; 

// Abre el modal y establece la imagen
function openModal(image) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    modal.style.display = "flex"; 
    modalImage.src = image.src; 
    zoomLevel = 1; 
    modalImage.style.transform = "scale(1)"; 
    modalImage.style.cursor = "grab"; 
    modalImage.style.left = "0px"; 
    modalImage.style.top = "0px"; 
}

// Cierra el modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; 
}

// Control de zoom mediante la rueda del mouse
document.getElementById("imageModal").addEventListener("wheel", function(event) {
    event.preventDefault(); 

    const modalImage = document.getElementById("modalImage");

    // Ajusta el nivel de zoom en función de la dirección de desplazamiento de la rueda
    if (event.deltaY < 0) {
        zoomLevel = Math.min(zoomLevel + 0.1, 3); 
    } else {
        zoomLevel = Math.max(zoomLevel - 0.1, 1); 
    }

    modalImage.style.transform = `scale(${zoomLevel})`; 

    // Cambia el cursor en función del nivel de zoom
    modalImage.style.cursor = zoomLevel > 1 ? "grab" : "default";
});

// Eventos para arrastrar la imagen solo en zoom
const modalImage = document.getElementById("modalImage");

// Al comenzar el arrastre
modalImage.addEventListener("mousedown", function(event) {
    if (zoomLevel > 1) { 
        isDragging = true;
        modalImage.style.cursor = "grabbing"; 
        startX = event.clientX;
        startY = event.clientY;
        initialX = parseInt(modalImage.style.left) || 0;
        initialY = parseInt(modalImage.style.top) || 0;
    }
});

// Al mover el ratón durante el arrastre
document.addEventListener("mousemove", function(event) {
    if (isDragging) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        modalImage.style.left = `${initialX + dx}px`;
        modalImage.style.top = `${initialY + dy}px`;  
    }
});

// Al soltar el ratón, se detiene el arrastre
document.addEventListener("mouseup", function() {
    if (isDragging) {
        isDragging = false;
        modalImage.style.cursor = "grab";
    }
});
