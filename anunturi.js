function initializePage() {
    const apiUrl = "http://localhost:8080/anunt";

    function getAnunturi(name) {
        const url = name ? `${apiUrl}/anunt/${name}` : apiUrl;
    
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
            })
            .then(data => {
                if (Array.isArray(data)) {
                    console.log("Data received:", data);
                    displayAnunturi(data);
                } else {
                    console.log("Single data received:", data);
                    displayAnunturi([data]); // Convert single object to an array
                }
            })
            .catch(error => console.error('Eroare la obținerea datelor:', error));
    }
    

    function displayAnunturi(anunturi) {
        const container = document.getElementById('container');

        // Sterge anunțurile existente (dacă există)
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    
        // Adaugă anunțurile noi
        anunturi.forEach(anunt => {
            const anuntElement = createAnuntElement(anunt);
            container.appendChild(anuntElement);
        });
    }

    function createAnuntElement(anunt) {
        const container = document.createElement('div');
        container.classList.add('anunt');
    
        const titleElement = document.createElement('h2');
        titleElement.textContent = anunt.name;
    
        const imageElement = document.createElement('img');
        const imagePath = `http://localhost:8080${anunt.path}`; 
        imageElement.src = imagePath;
        imageElement.alt = anunt.name;
    
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `Descriere: ${anunt.description}`;
    
        const sellerNameElement = document.createElement('p');
        sellerNameElement.textContent = `Nume Vanzator: ${anunt.user.name}`;
    
        const emailElement = document.createElement('p');
        emailElement.textContent = `Email: ${anunt.user.email}`;
    
        container.appendChild(titleElement);
        container.appendChild(imageElement);
        container.appendChild(descriptionElement);
        container.appendChild(sellerNameElement);
        container.appendChild(emailElement);
    
        return container;
    }
    
    function searchAnunturi() {
        var input = document.getElementById('searchInput');
        var filter = input.value.trim();
        getAnunturi(filter);
    }

    getAnunturi();
    document.getElementById('searchButton').addEventListener('click', searchAnunturi);
}

document.addEventListener("DOMContentLoaded", initializePage);
