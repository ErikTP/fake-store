// En säker nyckel för kryptering
const secretKey = 'mySecretKey'; 

// Krypterar lösenordet
function encryptPassword(password) {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

// Dekrypterar lösenordet
function decryptPassword(encryptedPassword) {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Hämtar användare från API och sparar i localStorage
async function fetchUsers() {
    try {
      const response = await fetch('https://fakestoreapi.com/users?limit=5');
      if (!response.ok) {
        throw new Error('Kunde inte hämta användare från API.');
      }
  
      const apiUsers = (await response.json()).map(user => ({
        username: user.username,
        password: encryptPassword(user.password)
      }));
  
      const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
      localStorage.setItem('users', JSON.stringify([...savedUsers, ...apiUsers]));
    } catch (err) {
      console.error("Error fetching users:", err);
      const messageBox = document.getElementById('login-message');
      messageBox.textContent = "Ett tekniskt fel uppstod. Försök igen senare.";
      messageBox.className = 'message-box visible';
    }
  }
  
  // Funktion för att hantera användarinloggning. Validerar inmatade användaruppgifter, 
  function loginUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const messageBox = document.getElementById('login-message');
  
    if (!username || !password) {
      messageBox.textContent = "Ange både användarnamn och lösenord!";
      messageBox.className = 'message-box visible';
      return;
    }
  
    // söker efter användaren i lagrade data, och loggar in om uppgifterna stämmer. 
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && decryptPassword(u.password) === password);

  // Om inloggningen lyckas, omdirigeras användaren till "member.html".
    if (user) {
      sessionStorage.setItem('loggedInUser', username);
      messageBox.textContent = "Inloggning lyckades!";
      messageBox.className = 'message-box visible';
      setTimeout(() => {
        window.location.href = 'member.html';
      }, 1000);
    } else {
      messageBox.textContent = "Fel användarnamn eller lösenord!";
      messageBox.className = 'message-box visible';
    }
  }
  
// Kopplar formuläret till funktion
document.getElementById('login-form').addEventListener('submit', loginUser);

// Hämtar användaren vid sidladdning
fetchUsers();
