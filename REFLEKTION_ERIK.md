# Dokumentation av FakeStore -Erik Torres Puente


Denna dokumentation beskriver strukturen och funktionaliteten i koden som implementerar en webbapplikation med funktioner för användarhantering, produktvisning och API-integration. Applikationen uppfyller kraven för JSON-datahantering, HTTP-förfrågningar, dynamiska komponenter och felhantering.

## Kodstruktur

Applikationen är indelad i fyra huvudsakliga JavaScript-filer:

1.  **index.js** Hanterar navigeringsfunktioner för huvudmenyn.

2. **login.js** Implementerar inloggningslogik och API-anrop för autentisering.

3. **signup.js** Ansvarar för registrering av nya användare och sparar data lokalt.

4. **member.js** Visar produkter, hanterar produktdetaljer, kategorifilter och sökning.

## JSON-datahantering 
JSON-data hanteras effektivt genom att hämta och bearbeta data från FakeStore API. Exempel:

-   **Hämta produkter:** 
    ```
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    ```

-   **Data mappar om API:s användare till ett lokalt format i fetchUsers och sparas i localStorage för åtkomst på klientsidan:** 
    ```
    const apiUsers = (await response.json()).map(user => ({
    username: user.username,
    password: encryptPassword(user.password)
    }));
    ```

## HTTP-förfrågningar
Applikationen implementerar API-anrop för:

-   **Hämtning av produktdata:** Hämtar produktinformation och kategorier från FakeStore API med fetch.

-   **Autentisering:** Hämtar användare från API och matchar uppgifter mot inloggningsförsök.

-   **Produktdetaljer:** Hämtar en specifik produkt baserat på ID:
    ```
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    ```

## Asynkrona funktioner
Alla API-anrop implementeras med async och await, vilket gör koden lättläst och effektiv i hanteringen av asynkrona operationer:

-   Fel hanteras med try-catch för att ge robusta och användarvänliga
    ```
    try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data');
     return await response.json();
    } catch (error) {
    console.error(error);
    showMessage(container, 'Error: ' + error.message);
    }
    ```
    
## Inloggningssida
Inloggningssidan låter användaren fylla i användarnamn och lösenord. Uppgifterna valideras och matchas mot lagrade data:

-   **Validering:** Kontroll av att alla fält är ifyllda:
    ```
    if (!username || !password) {
    messageBox.textContent = "Ange både användarnamn och lösenord!";
    return;
    }
    ```
-   **Omdirigering:** Vid lyckad inloggning omdirigeras användaren till member.html.    

## Dynamisk komponent
Produkter visas som dynamiskt genererade kort i en section:

-   **Rendering av produkter:** 
    ```
    sectionProd.innerHTML = products.map(product => `
    <article class="product-item">
        <img class="photo" src="${product.image}" alt="${product.title}">
        <h4>${product.title}</h4>
        <p>${product.description}</p>
        <p>$${product.price.toFixed(2)}</p>
    </article>
    `).join('');
    ```
-   Layouten är responsiv med CSS-styling.

## Sökfunktion
En sökfunktion låter användaren hämta en specifik produkt med ID:

-   **Validering:** Kontroll av att ID har angivits.   

-   **Produktdata:** Hämtas och visas med API-anrop.   

## Felhantering
Felhantering är implementerad med tydliga meddelanden:

-   **Användarvänliga felmeddelanden:** 
    ```
    showMessage(sectionProd, 'No products found for the selected category.');
    ```
-   **Avancerad hantering:** Fel från API eller felaktig inmatning hanteras med try-catch och kontextspecifika meddelanden.

## Avancerade Krav
### Kategorifilter

Produkter kan filtreras baserat på kategori:

-   **Filtrering:** Användaren väljer kategori från en select-meny.
    ```
    const filtered = products.filter(p => p.category === selectedCategory);
    renderProducts(filtered);
    ```
### LocalStorage
Användarens namn sparas i localStorage vid inloggning och visas på shop-sidan.

### Validering av input
Formulärfält kontrolleras för att förhindra tomma inmatningar:

-   Vid inloggning och produkt-ID-sökning visas meddelanden vid fel.

### Effektiv kodstruktur
Upprepad logik är abstraherad i återanvändbara funktioner, exempelvis för kryptering och API-anrop.

### Responsiv layout
Produktkorten har en flexibel layout som anpassas till olika skärmstorlekar med hjälp av CSS.

***

## Reflektion
Koden kombinerar JavaScript med en tydlig och modulär struktur. Användningen av async/await och effektiv JSON-hantering säkerställer smidig interaktion med API:et. Validering och felhantering ger en robust och användarvänlig upplevelse. Dock kan kodåteranvändning förbättras ytterligare genom att flytta gemensamma funktioner till en separat utility-fil. Målet var dock att hålla det simpelt med få filer, där varje HTML kod enbart länkas till en CSS fil och en Javascript fil. Den dynamiska renderingens och filtreringsförmågans design är kan utvecklas vidare för ännu bättre prestanda och skalbarhet.
