// Arrays de palabras para cada idioma
const wordsEs = ["Desarrollador Frontend", "Desarrollador Backend en progreso", "Artista 3D", "Desarrollador de Videojuegos en Progreso"];
const wordsEn = ["Frontend Developer", "Backend Developer in progress", "3D Artist", "Video Games Developer in Progress"];
let words = wordsEs; // Por defecto, en español
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.text-animation span');
const typingSpeed = 70; // Velocidad de escribir
const deletingSpeed = 35; // Velocidad de borrar
const delayBetweenWords = 1500; // Pausa entre palabras

// Función de animación
function typeWords() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentWord.substring(0, charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Pasa a la siguiente palabra
            setTimeout(typeWords, delayBetweenWords); // Pausa antes de comenzar a escribir la siguiente palabra
        } else {
            setTimeout(typeWords, deletingSpeed);
        }
    } else {
        charIndex++;
        typingElement.textContent = currentWord.substring(0, charIndex);
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWords, delayBetweenWords); // Pausa antes de empezar a borrar
        } else {
            setTimeout(typeWords, typingSpeed);
        }
    }
}

// Función para cambiar el idioma del portfolio
function setLanguage(lang) {
    const buttons = document.querySelectorAll('.language-selector button');
    const elementsToTranslate = document.querySelectorAll('.lang'); // Selecciona todos los elementos con la clase 'lang'

    // Eliminar la clase 'active' de todos los botones
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Añadir la clase 'active' al botón clicado
    const activeButton = document.querySelector(`.language-selector button[lang="${lang}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Mostrar/Ocultar contenido en función del idioma seleccionado
    elementsToTranslate.forEach(element => {
        if (element.classList.contains(lang)) {
            element.style.display = ''; // Mostrar el elemento si coincide el idioma
        } else {
            element.style.display = 'none'; // Ocultar el resto de idiomas
        }
    });

    // Reiniciar la animación de palabras al cambiar el idioma
    if (lang === 'es') {
        words = wordsEs; // Cambiar a las palabras en español
    } else if (lang === 'en') {
        words = wordsEn; // Cambiar a las palabras en inglés
    }
    
    // Reiniciar índices de la animación y reiniciar la animación
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typingElement.textContent = ''; // Limpiar el contenido del span
    typeWords(); // Reiniciar la animación
}

// Cambiar el idioma al clicar en uno de los botones
document.querySelectorAll('.language-selector button').forEach(button => {
    button.addEventListener('click', function () {
        const lang = this.getAttribute('lang'); // Obtener el idioma del botón
        setLanguage(lang); // Llamar a la función para cambiar el idioma
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

// Ocultar el menú al hacer clic en un enlace dentro del menú y llevarnos a la sección indicada
const navLinks = document.querySelectorAll('.navBar a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.navBar').classList.remove('active'); // Escondemos el menú
    });
});

// Ocultar el menú al hacer click fuera
document.addEventListener('click', function(event) {
    const navBar = document.querySelector('.navBar');
    if (!navBar.contains(event.target) && !menuIcon.contains(event.target)) {
        navBar.classList.remove('active'); // Escondemos el menú si no estamos en el navBar ni en el menú
    }
});

// Iniciar la animación de escritura al cargar la página
typeWords();
