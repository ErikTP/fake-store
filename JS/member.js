document.addEventListener('DOMContentLoaded', () => {
    const headingElement = document.querySelector('.heading');
    const loggedInUser = sessionStorage.getItem('loggedInUser'); // Hämta användarnamnet
    
    if (loggedInUser) {
      headingElement.textContent = `Välkommen, ${loggedInUser}!`; // Visa användarnamnet
    } else {
      headingElement.textContent = "Ingen användare inloggad.";
    }
  });
  