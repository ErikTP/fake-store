// Hämtar referens till DOM-element, navigeringslänkar
const navLinks = document.getElementById("navLinks");

// Visar menyfält till höger om webbsidan vid klick på hamburgarmenyn
function showMenu() {
    navLinks.style.right = "0";
}

// Döljer menyfält vid klick på X
function hideMenu() {
    navLinks.style.right = "-200px";
}

