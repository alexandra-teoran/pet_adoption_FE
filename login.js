function submitLoginForm(event) {
    event.preventDefault();


    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

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

    // Restul codului pentru a trimite datele către backend
    // ...

    fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        console.log('Response status:', response.status);
    
        // Afișează întregul obiect de răspuns în consolă pentru investigare
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
    
        if (data.token) {
            console.log('Conectare reușită!');
    
            // Salvare token și ID utilizator în localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
    
            // Redirecționare către index.html
            window.location.href = 'indexsucces.html';
        } else {
            console.log('Conectare eșuată.');
            // Afișare mesaj de eroare sau alte acțiuni în caz de eșec
        }
    })
    .catch(error => {
        console.error('Eroare la conectarea utilizatorului:', error);
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
