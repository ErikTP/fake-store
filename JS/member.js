// Hämtar referenser till viktiga DOM-element: filtermeny, produktsektion, produktdetaljer och navigeringslänkar.
const categoryFilter = document.querySelector('#category-filter');
const sectionProd = document.querySelector('.section-prod');
const productDetails = document.querySelector('#product-details');
const navLinks = document.getElementById("navLinks");

// Visar menyfält till höger om webbsidan vid klick på hamburgarmenyn
function showMenu() {
    navLinks.style.right = "0";
}

// Döljer menyfält vid klick på X
function hideMenu() {
    navLinks.style.right = "-200px";
}

// Visar meddelanden i en given behållare
function showMessage(container, message, isError = true) {
  container.innerHTML = `
    <p style="color: ${isError ? 'var(--clr-orange-1)' : 'green'}; font-size: 1.2rem;">
      ${message}
    </p>
  `;
}

// Hämtar användarnamnet för inloggade användare
document.addEventListener('DOMContentLoaded', () => {
    const headingElement = document.querySelector('.heading');
    const loggedInUser = sessionStorage.getItem('loggedInUser'); 
    
    // Visar användarnamnet för inloggade användare, annars länkas man till login sida
    if (loggedInUser) {
      headingElement.textContent = `Welcome, ${loggedInUser}!`; 
    } else {
        window.location.href = 'login.html';
      headingElement.textContent = "No user logged in.";
    }
  });

// Hämtar och visar alla produkter från fakeStore API
async function fetchAndDisplayProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    const products = await response.json();

    if (!products.length) throw new Error('No products available.');
    renderProducts(products);
  } catch (error) {
    showMessage(sectionProd, `Error: ${error.message}`);
    console.error(error);
  }
}

// Hämtar och visar en produkt baserat på ID
async function fetchProductById(productId) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) throw new Error('Product not found');

    const product = await response.json();
    productDetails.innerHTML = `
      <div>
        <h4>${product.title}</h4>
        <img class="photo" src="${product.image}" alt="${product.title}" style="width: 150px; border: 2px solid var(--clr-orange-2); margin: 1rem 0;">
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> ${product.category}</p>
      </div>
    `;
  } catch (error) {
    showMessage(productDetails, 'Product not found. Please enter a valid ID.');
    console.error(error);
  }
}

// Klick eventlyssnare för sökknappen som kopplar ett nummer till produktid.
document.querySelector('#search-button').addEventListener('click', () => {
  const productId = document.querySelector('#product-id-input').value.trim();
  if (productId) {
    fetchProductById(productId);
  } else {
    alert('Please enter a product ID');
  }
});

// Hämtar produktens kategorier
async function initShop() {
  const url = 'https://fakestoreapi.com/products';
  try {
    const categories = await (await fetch(`${url}/categories`)).json();
    const products = await (await fetch(url)).json();

    if (!categories.length) throw new Error('No categories found.');
    if (!products.length) throw new Error('No products found.');

    setupCategoryFilter(categories, products);
    renderProducts(products);
  } catch (error) {
    showMessage(sectionProd, `Error loading data: ${error.message}`);
    console.error(error);
  }
}

// Funktion för att rendera produkter på sidan för särskild kategori. Om inga produkter finns visas ett meddelande. 
// Annars skapas HTML för varje produkt och läggs till i sektionen för produkter.
function renderProducts(products) {
  if (!products.length) {
    showMessage(sectionProd, 'No products found for the selected category.');
    return;
  }
  sectionProd.innerHTML = products.map(product => `
    <article class="product-item">
      <div class="blur-content">
        <img class="photo" src="${product.image}" alt="${product.title}">
        <div class="product-info">
          <h4>${product.title}</h4>
          <p class="product-text">${product.description}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
      </div>
    </article>
  `).join('');
}

// Sätter upp kategori-filter
function setupCategoryFilter(categories, products) {
  categoryFilter.innerHTML = `
    <option value="all">All</option>
    ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
  `;
  categoryFilter.addEventListener('change', (e) => {
    const filtered = e.target.value === 'all'
      ? products
      : products.filter(p => p.category === e.target.value);

    renderProducts(filtered);
  });
}

// Initierar shoppen och produkter vid sidladdning
document.addEventListener('DOMContentLoaded', () => {
  initShop();
  fetchAndDisplayProducts();
});