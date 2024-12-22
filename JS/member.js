document.addEventListener('DOMContentLoaded', () => {
    const headingElement = document.querySelector('.heading');
    const loggedInUser = sessionStorage.getItem('loggedInUser'); // Hämta användarnamnet
    
    if (loggedInUser) {
      headingElement.textContent = `Välkommen, ${loggedInUser}!`; // Visa användarnamnet
    } else {
      headingElement.textContent = "Ingen användare inloggad.";
    }
  });
  
  async function fetchAndDisplayProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
  
      const productsContainer = document.querySelector('.section-prod');
      productsContainer.innerHTML = ''; // Töm behållaren först
  
      products.forEach(product => {
        const productHTML = `
          <article class="product-item">
            <div class="blur-content">
              <img class="photo" src="${product.image}" alt="${product.title}">
              <div class="product-info">
                <div class="product-header">
                  <h4>${product.title}</h4>
                </div>
                <p class="product-text">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
              </div>
            </div>
          </article>
        `;
  
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  // Kör funktionen vid sidladdning
  document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
  