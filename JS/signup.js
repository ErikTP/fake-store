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

// Hanterar registrering
function registerUser(event) {
    event.preventDefault();
  
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const messageBox = document.getElementById('register-message');
    if (users.some(u => u.username === username)) {
      messageBox.textContent = "Användarnamnet finns redan!";
    } else {
      users.push({ username, password: encryptPassword(password) }); // Krypterar lösenord
      localStorage.setItem('users', JSON.stringify(users));
      messageBox.textContent = "Registrering lyckades!";
    }
    messageBox.className = 'message-box visible';
  }
  
  // Kopplar formuläret till funktion
  document.getElementById('register-form').addEventListener('submit', registerUser);