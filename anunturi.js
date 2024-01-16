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
                    displayAnunturi([data]); 
                }
            })
            .catch(error => console.error('Eroare la obținerea datelor:', error));
    }

    function displayAnunturi(anunturi) {
        const container = document.getElementById('container');

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }


        anunturi.forEach(anunt => {
            const anuntElement = createAnuntElement(anunt);
            container.appendChild(anuntElement);
        });
    }

    function createAnuntElement(anunt) {
        const backendImageUrl = "http://localhost:8080/anunt/image/";
        const container = document.createElement('div');
        container.classList.add('anunt');

        const titleElement = document.createElement('h2');
        titleElement.textContent = anunt.name;

        const imageElement = document.createElement('img');
        const imagePath = anunt.path;
        const imageName = imagePath.split('/').pop();
        imageElement.src = backendImageUrl + imageName;
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

        const likeButton = document.createElement('button');
        likeButton.textContent = `Like (${anunt.nrLikes})`;
        likeButton.id = `likeButton_${anunt.id}`;
        likeButton.addEventListener('click', () => handleLikeButtonClick(anunt.id));

        container.appendChild(likeButton);

        return container;
}

function handleLikeButtonClick(anuntId) {
    const likeUrl = `${apiUrl}/like/${anuntId}`;
    
    fetch(likeUrl, { method: 'PUT' })
        .then(response => response.json())
        .then(updatedAnunt => {
            console.log(`Like status changed for Anunt ${anuntId}. New nrLikes: ${updatedAnunt.nrLikes}`);
            updateLikeButton(anuntId, updatedAnunt.nrLikes);
        })
        .catch(error => console.error('Eroare la adăugarea like-ului:', error));
}

function updateLikeButton(anuntId, nrLikes) {
    const likeButton = document.getElementById(`likeButton_${anuntId}`);
    if (likeButton) {
        likeButton.textContent = nrLikes > 0 ? `Unlike (${nrLikes})` : `Like (${nrLikes})`;
    }
}

    

    function searchAnunturi() {
        var input = document.getElementById('search-input');
        var filter = input.value.trim();


        if (filter === '') {
            getAnunturi();
        } else {

            getAnunturi(filter);
        }
    }


    document.getElementById('searchButton').addEventListener('click', searchAnunturi);

    document.getElementById('search-input').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            searchAnunturi();
        }
    });


    getAnunturi();
}

document.addEventListener("DOMContentLoaded", initializePage);
