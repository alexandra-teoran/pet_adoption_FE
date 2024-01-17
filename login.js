function submitLoginForm(event) {
    event.preventDefault();


    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

  
    if (!isValidEmail(email)) {
        alert('Introduceți o adresă de email validă.');
        return;
    }

    if (!isValidPassword(password)) {
        alert('Parola trebuie să conțină cel puțin 8 caractere, cel puțin 1 literă mică, 1 literă mare, 1 cifră și 1 caracter special.');
        return;
    }


 

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
    

        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
    
        if (data.token) {
            console.log('Conectare reușită!');
    

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
    

            window.location.href = 'indexsucces.html';
        } else {
            console.log('Conectare eșuată.');
            alert("Email sau parola gresita.");

        }
    })
    .catch(error => {
        console.error('Eroare la conectarea utilizatorului:', error);
    });
}


function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function isValidPassword(password) {
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
    return passwordRegex.test(password);
}

function register(){
    window.location.href = 'register.html';
}

