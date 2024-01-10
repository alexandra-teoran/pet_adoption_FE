function initializePage() {
    console.log("initializePage called!");
    const apiUrl = "http://localhost:8080/anunt";

    function getAnunturi(name) {
        const url = name ? `${apiUrl}/anunt/${name}` : apiUrl;

        fetch(url)
            .then(response => response.json())
            .then(data => {console.log("Data received:", data); displayAnunturi(data)})
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
        const anuntElement = document.createElement('div');
        anuntElement.classList.add('anunt');

        anuntElement.innerHTML = `
            <h2>${anunt.titlu}</h2>
            <img src="${anunt.imagine}" alt="${anunt.titlu}">
            <p>${anunt.descriere}</p>
            <p>Nume Vanzator: ${anunt.numeVanzator}</p>
            <p>Numar Telefon: ${anunt.numarTelefon}</p>
        `;

        return anuntElement;
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
