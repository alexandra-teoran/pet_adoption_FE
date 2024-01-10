function submitForm(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;

    // Verificare pentru nume
    if (name.length < 2) {
        alert('Numele trebuie să conțină cel puțin 2 caractere.');
        return;
    }

    // Verificare pentru email
    if (!isValidEmail(email)) {
        alert('Introduceți o adresă de email validă.');
        return;
    }

    // Verificare pentru parolă
    if (!isValidPassword(password)) {
        alert('Parola trebuie să conțină cel puțin 8 caractere, cel puțin 1 literă mică, 1 literă mare, 1 cifră și 1 caracter special.');
        return;
    }

    // Verificare pentru potrivirea parolelor
    if (password !== password2) {
        alert('Parola și confirmarea parolei nu se potrivesc.');
        return;
    }

    // Restul codului pentru a trimite datele către backend
    // ...

    fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            address: address,
            password: password,
            password2: password2
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Utilizator înregistrat cu succes:', data);
        // Poți face orice acțiune după înregistrarea cu succes a utilizatorului.
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Eroare la înregistrarea utilizatorului:', error);
        // Poți afișa un mesaj de eroare sau alte acțiuni în caz de eroare.
    });
}

// Funcție pentru a verifica structura adresei de email
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Funcție pentru a verifica structura parolei
function isValidPassword(password) {
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
    return passwordRegex.test(password);
}
