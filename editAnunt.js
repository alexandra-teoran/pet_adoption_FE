document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const anuntId = urlParams.get('id');

    const editAnuntForm = document.getElementById('editAnuntForm');

    // Populează formularul cu datele anunțului existent
    fetch(`http://localhost:8080/anunt/old/edit/${anuntId}`)
        .then(response => response.json())
        .then(anunt => {
            document.getElementById('title').value = anunt.name;
            document.getElementById('description').value = anunt.description;
            // Alte câmpuri pentru editare
            document.getElementById('image').files[0] = anunt.path;
            // La submit, trimite actualizările către backend
            editAnuntForm.addEventListener('submit', function (event) {
                event.preventDefault();
                submitEditedAnunt(anuntId);
            });
        })
        .catch(error => console.error('Eroare la obținerea detaliilor pentru editare:', error));
});

function submitEditedAnunt(anuntId) {
    const editedAnuntData = {
        name: document.getElementById('title').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').files[0],
        // Alte câmpuri pentru editare
    };

    // Trimite actualizările către backend
    fetch(`http://localhost:8080/anunt/edit/${anuntId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedAnuntData)
    })
        .then(response => {
            if (response.ok) {
                console.log(`Anunt ${anuntId} a fost actualizat.`);
                // Redirecționează utilizatorul către pagina cu anunțurile sale sau altă destinație relevantă
                window.location.href = 'account.html';
            } else {
                throw new Error(`Request failed with status: ${response.status}`);
            }
        })
        .catch(error => console.error('Eroare la actualizarea anunțului:', error));
}

function back(){
    window.location.href = 'account.html';
}
