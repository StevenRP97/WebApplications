document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log("It's about to call the endpoint")
    fetch("/submit-form", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })    
    .then(response => response.text())
    .then(data => {
        document.getElementById('responseMessage').textContent = data;
        document.getElementById('contactForm').reset();
    })  
    .catch(error => console.error('Error:', error));
    console.log("It just called the endpoint");
});
