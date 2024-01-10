function submitForm() {
    var userId = getUserId(); // Trebuie să ai o funcție pentru a obține ID-ul utilizatorului
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var image = document.getElementById('image').files[0];

    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    fetch('http://localhost:8080/anunt', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Anunt salvat cu succes:', data);
        // Poți face orice acțiune după salvarea cu succes a anunțului.
    })
    .catch(error => {
        console.error('Eroare la salvarea anuntului:', error);
        // Poți afișa un mesaj de eroare sau alte acțiuni în caz de eroare.
    });
}

function getUserId() {
    // Implementează logica pentru a obține ID-ul utilizatorului
    // ...
    return 1;
}
