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

  async function fetchProductById(productId) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const product = await response.json();
  
      // Rendera produktdetaljer
      const productDetails = document.querySelector('#product-details');
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
      const productDetails = document.querySelector('#product-details');
      productDetails.innerHTML = `<p style="color: var(--clr-orange-1);">Product not found. Please enter a valid ID.</p>`;
    }
  }
  
  // Lyssna på sökknappen
  document.querySelector('#search-button').addEventListener('click', () => {
    const productId = document.querySelector('#product-id-input').value;
    if (productId) {
      fetchProductById(productId);
    } else {
      alert('Please enter a product ID');
    }
  });
  
  
  // Kör funktionen vid sidladdning
  document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
  