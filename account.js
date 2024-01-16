function initializePage() {
    const apiUrl = "http://localhost:8080/anunt";

    // Funcția pentru afișarea mesajului de bun venit
    function displayWelcomeMessage(userName) {
        getUserName(localStorage.getItem('userId'));
        const welcomeMessage = document.createElement('h1');
        welcomeMessage.textContent = `Welcome ${userName}!`;
        document.getElementById('user-name').appendChild(welcomeMessage);
    }

    // Funcția pentru a obține numele utilizatorului din server
    function getUserName(userId) {
        const userUrl = `http://localhost:8080/users/user/${userId}`;
    
        fetch(userUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
            })
            .then(userData => {
                const userName = userData.name; // Asume că numele utilizatorului este disponibil în răspuns
                localStorage.setItem('userName', userName); // Salvează numele utilizatorului în Local Storage
                displayWelcomeMessage(userName); // Afișează mesajul de bun venit
                // Mută getAnunturi() aici pentru a te asigura că numele utilizatorului este disponibil înainte de a afișa anunțurile
                getAnunturi(userName);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }

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

    // Funcția pentru afișarea anunțurilor
    function displayAnunturi(anunturi) {
        const anunturiList = document.getElementById('anunturi-list');

        // Sterge anunțurile existente (dacă există)
        while (anunturiList.firstChild) {
            anunturiList.removeChild(anunturiList.firstChild);
        }

        // Adaugă anunțurile noi
        anunturi.forEach(anunt => {
            const anuntElement = createAnuntElement(anunt);
            anunturiList.appendChild(anuntElement);
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
                // Actualizează interfața cu noul număr de "like"-uri
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
}

document.addEventListener("DOMContentLoaded", initializePage);
