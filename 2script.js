
function toggleMenu() {
    const navBar = document.querySelector('.navBar');
    navBar.classList.toggle('active'); /* Añade o quita la clase 'active' al hacer clic */
}

document.querySelector('.navBar').addEventListener('mouseleave', function(){
    this.classList.remove('active');
});

const navLinks = document.querySelectorAll('.navBar a');
navLinks.forEach(link =>{
    link.addEventListener('click', function(){
        document.querySelector('.navBar').classList.remove('active');
    });
});
