const secretKey = 'mySecretKey'; // Använd en säker nyckel för kryptering

// Kryptera lösenord
function encryptPassword(password) {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

// Dekryptera lösenord
function decryptPassword(encryptedPassword) {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Hämta användare från API och spara i localStorage
async function fetchUsers() {
  try {
    const response = await fetch('https://fakestoreapi.com/users?limit=5');
    const apiUsers = (await response.json()).map(user => ({
      username: user.username,
      password: encryptPassword(user.password) // Kryptera lösenord
    }));

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...savedUsers, ...apiUsers]));
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

// Hantera inloggning
function loginUser(event) {
    event.preventDefault();
  
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const messageBox = document.getElementById('login-message');
    const user = users.find(u => u.username === username && decryptPassword(u.password) === password); // Dekryptera lösenord
  
    if (user) {
      messageBox.textContent = "Inloggning lyckades!";
      messageBox.className = 'message-box visible';
      setTimeout(() => {
        window.location.href = 'member.html'; // Omdirigera till admin-sidan
      }, 1000); // Vänta 1 sekund innan omdirigering
    } else {
      messageBox.textContent = "Fel användarnamn eller lösenord!";
      messageBox.className = 'message-box visible';
    }
  }

// Koppla formulär till funktioner
document.getElementById('login-form').addEventListener('submit', loginUser);

// Hämta användare vid sidladdning
fetchUsers();
