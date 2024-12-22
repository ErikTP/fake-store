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

// Hantera registrering
function registerUser(event) {
    event.preventDefault();
  
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const messageBox = document.getElementById('register-message');
    if (users.some(u => u.username === username)) {
      messageBox.textContent = "Användarnamnet finns redan!";
    } else {
      users.push({ username, password: encryptPassword(password) }); // Kryptera lösenord
      localStorage.setItem('users', JSON.stringify(users));
      messageBox.textContent = "Registrering lyckades!";
    }
    messageBox.className = 'message-box visible';
  }
  
  // Koppla formulär till funktioner
  document.getElementById('register-form').addEventListener('submit', registerUser);