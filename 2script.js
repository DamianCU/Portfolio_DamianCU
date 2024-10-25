// Arrays of words for each language
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
let words = wordsEs; // En español por defecto
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80; // Velocidad de escritura
const deletingSpeed = 50; // velocidad de borrado
const delayBetweenWords = 1500; // Pausa entre palabras

// Funcion para typing 
function typeWords() {
    const typingElement = document.querySelector('.text-animation span');
    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentWord.substring(0, charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to the next word
            setTimeout(typeWords, delayBetweenWords); // Pause before typing the next word
        } else {
            setTimeout(typeWords, deletingSpeed);
        }
    } else {
        charIndex++;
        typingElement.textContent = currentWord.substring(0, charIndex);
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWords, delayBetweenWords); // Pause before starting to delete
        } else {
            setTimeout(typeWords, typingSpeed);
        }
    }
}

// Function to change the language of the portfolio
function setLanguage(lang) {
    const buttons = document.querySelectorAll('.language-selector button');
    const elementsToTranslate = document.querySelectorAll('.lang'); // Select all elements with class 'lang'

    // Remove the 'active' class from all buttons
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Add the 'active' class to the clicked button
    const activeButton = document.querySelector(`.language-selector button[lang="${lang}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Show/Hide content based on the selected language
    elementsToTranslate.forEach(element => {
        if (element.classList.contains(lang)) {
            element.style.display = ''; // Show the element if it matches the language
        } else {
            element.style.display = 'none'; // Hide the rest of the languages
        }
    });

    // Update the words and restart the typing animation
    words = lang === 'es' ? wordsEs : wordsEn;

    // Reset the typing animation
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;
    const typingElement = document.querySelector('.text-animation span');
    typingElement.textContent = ''; // Clear the content of the span
    setTimeout(typeWords,100); // Restart the animation
}

// Function to show/hide the dropdown menu when clicking the menu icon
function toggleMenu() {
    const navBar = document.querySelector('.navBar');
    if (navBar) {
        navBar.classList.toggle('active'); // Show/Hide the 'active' class of navBar
    }
}
// Function to hide the menu
function hideMenu() {
    const navBar = document.querySelector('.navBar');
    if (navBar) {
        navBar.classList.remove('active'); // Hide the menu
    }
}
// Ensure the menu icon exists before adding event listeners
const menuIcon = document.getElementById('menu-icon');
if (menuIcon) {
    menuIcon.addEventListener('click', toggleMenu);
}

// Hide the menu when clicking a link within the menu
const navLinks = document.querySelectorAll('.navBar a');
navLinks.forEach(link => {
    link.addEventListener('click', hideMenu); // Use hideMenu function
});

// Hide the menu when clicking outside
document.addEventListener('click', function(event) {
    const navBar = document.querySelector('.navBar');
    if (navBar && navBar.classList.contains('active') && !navBar.contains(event.target) && !menuIcon.contains(event.target)) {
        hideMenu(); // Hide the menu if not in navBar or menu
    }
});




// Start the typing animation and language handling on page load
document.addEventListener('DOMContentLoaded', function() {
    typeWords(); // Start the typing animation

    // Set up language toggle on page load
    document.querySelectorAll('.language-selector button').forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('lang'); // Get the language from the button
            setLanguage(lang); // Change language
        });
    });
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

const modalImage = document.getElementById("modalImage");


