function submitForm() {

    var token = localStorage.getItem('token');
    var redirectTo = localStorage.getItem('redirectTo');

   
    var userId = getUserId(); 
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var image = document.getElementById('image').files[0];

    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('nrLikes', 0);
    formData.append('likedByCurrentUser', false);


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

    })
    .catch(error => {
        console.error(error.message);

    });
}

function getUserId() {
    var userId = localStorage.getItem('userId');
    return userId;
}

