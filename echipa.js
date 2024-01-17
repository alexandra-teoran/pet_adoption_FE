function updateNavbar() {
    var token = localStorage.getItem('token');
    var navbar = document.getElementById('myNavbar');

    if (token) {
        // Utilizatorul este autentificat, afișează "Profil" și ascunde "Conecteaza-te"
        navbar.innerHTML = `
            <img class="navbar-logo"  src="logo2.png" style=" width: 100px; height: 100px; border-radius: 150px 150px 150px 150px;">
            <a class="navbar-link" href="indexsucces.html">Acasa</a>
            <a class="navbar-link" href="contact.html">Contacteaza-ne!</a>
            <a class="navbar-link" href="echipa.html">Echipa</a>
            <a class="navbar-link" href="anunturi.html">Anunturi</a>
            <a class="navbar-link" href="formularanunturi.html">Posteaza anunt</a>
            <a class="navbar-link" href="account.html">Profil</a>
        `;
    } else {
        // Utilizatorul nu este autentificat, afișează "Conecteaza-te" și ascunde "Profil"
        navbar.innerHTML = `
        <img class="navbar-logo"  src="logo2.png" style=" width: 100px; height: 100px; border-radius: 150px 150px 150px 150px;">
            <a class="navbar-link" href="indexsucces.html">Acasa</a>
            <a class="navbar-link" href="contact.html">Contacteaza-ne!</a>
            <a class="navbar-link" href="echipa.html">Echipa</a>
            <a class="navbar-link" href="anunturi.html">Anunturi</a>
            <a class="navbar-link" href="formularanunturi.html">Posteaza anunt</a>
            <a class="navbar-link" href="login.html" style="text-decoration: none;">Conecteaza-te</a>
        `;
    }
}
updateNavbar();