// funktionen tager teksten fra username, password og email og gemmer det i localstorage (kan sagtens tilføje dem alle)
// grundet "require" i HTML, kan man ikke oprette sig uden at opfylde de felter hvortil require er brugt
function createUser() {
    const username = document.getElementById('username-sign-up').value;
    const password = document.getElementById('password-sign-up').value;
    const email = document.getElementById('email-sign-up').value;

    
    const user = {
        username: username,
        password: password,
        email: email
    };

    const userJSON = JSON.stringify(user);
    localStorage.setItem('user', userJSON);

} 
