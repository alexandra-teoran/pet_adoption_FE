function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    fetch('http://localhost:8080/contact', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Mesaj inregistrat cu succes:', data);
        alert('Mesaj inregistrat cu succes');
    })
    .catch(error => {
        console.error('Eroare la inregistrarea mesajului:', error);
    });
}

function back(){
    window.location.href = 'indexsucces.html';
}