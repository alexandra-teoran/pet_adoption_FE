function submitForm() {

    var token = localStorage.getItem('token');
    var redirectTo = localStorage.getItem('redirectTo');

    if (token) {
        if (redirectTo && redirectTo === 'formularanunturi.html') {
            // Utilizatorul este autentificat și intenționează să adauge un anunț
            // Redirecționează către pagina de adăugare anunțuri
            window.location.href = 'formularanunturi.html';
        } else {
            // Utilizatorul este autentificat, dar nu se află pe pagina de adăugare anunțuri
            // Redirecționează către pagina de home sau altă pagină
            window.location.href = 'indexsucces.html';
        }
    } else {
        // Utilizatorul nu este autentificat, menține-l pe pagina de login
    }

    var userId = getUserId(); // Trebuie să ai o funcție pentru a obține ID-ul utilizatorului
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var image = document.getElementById('image').files[0];

    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    var token = localStorage.getItem('token');

    fetch('http://localhost:8080/anunt', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Eroare la salvarea anunțului');
        }
    })
    .then(data => {
        console.log('Anunt salvat cu succes:', data);
        alert('Anunt salvat cu succes!');
        // Poți face orice acțiune după salvarea cu succes a anunțului.
    })
    .catch(error => {
        console.error(error.message);
        // Poți afișa un mesaj de eroare sau alte acțiuni în caz de eroare.
    });
}

function getUserId() {
    var userId = localStorage.getItem('userId');
    return userId;
}

