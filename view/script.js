async function signupHandle(e) {
    e.preventDefault();

    const username = document.getElementById("signusername").value;
    const email = document.getElementById("signemail").value;
    const password = document.getElementById("signpass").value;

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email, username, password })
        });
        console.log(response.body);

        const data = response.json();
        console.log(data)
        showMessage(data.message);
    } catch (err) {
        console.error(`Error : ${err}`);
        showMessage("some error got during signup.");
    }
}

async function loginHandle(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("pass").value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            showMessage(`Welcome! role : ${data.role}`);
            window.location.href("http://localhost:3000/")
        } else {
            showMessage(data.message);
        }
    } catch (err) {
        console.error('Error: ' + err);
        var message = "Some Error got during complete login.";
        showMessage(message);
    }
}

function showMessage(message) {
    alert(message);
    window.location.href("http:localhost:3000");
}

document.querySelector('.signup form').addEventListener('submit', signupHandle);
document.querySelector('.login form').addEventListener('submit', loginHandle);