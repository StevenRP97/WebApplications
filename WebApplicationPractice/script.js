// POST endpoint 
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('responseMessage');
        if (data.error) {
            messageDiv.textContent = `Error: ${data.error}`;
            messageDiv.style.color = 'red';
        } else {
            messageDiv.textContent = `Success: Contact added with ID ${data.contactId}`;
            messageDiv.style.color = 'green';
            document.getElementById('contactForm').reset();
            fetchContacts(); // Refresh the contacts list after adding a new contact
        }
    })
    .catch(error => {
        const messageDiv = document.getElementById('responseMessage');
        messageDiv.textContent = `Error: ${error.message}`;
        messageDiv.style.color = 'red';
    });
});

// DELETE endpoint 
document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name2').value;

    fetch('http://localhost:3000/bye', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('deleteMessage');
        if (data.error) {
            messageDiv.textContent = `Error: ${data.error}`;
            messageDiv.style.color = 'red';
        } else {
            messageDiv.textContent = `Success: Deleted user ${data.name}`;
            messageDiv.style.color = 'green';
            document.getElementById('deleteForm').reset();
            fetchContacts(); // Refresh the contacts list after adding a new contact
        }
    })
    .catch(error => {
        const messageDiv = document.getElementById('responseMessage');
        messageDiv.textContent = `Error: ${error.message}`;
        messageDiv.style.color = 'red';
    });
});

// GET endpoint
function fetchContacts() {
    fetch('http://localhost:3000/main')
        .then(response => response.json())
        .then(data => {
            const contactsList = document.getElementById('contactsList');
            contactsList.innerHTML = '';

            if (data.length === 0) {
                contactsList.textContent = 'No contacts available.';
            } else {
                data.forEach(contact => {
                    const contactDiv = document.createElement('div');
                    contactDiv.classList.add('contact-item');
                    contactDiv.innerHTML = `
                        <div class="sub-container">
                            <p><strong>ID:</strong> ${contact.id}</p>
                            <p><strong>Name:</strong> ${contact.name}</p>
                            <p><strong>Description:</strong> ${contact.description}</p>
                        </div>
                        <hr>
                    `;
                    contactsList.appendChild(contactDiv);
                });
            }
        })
        .catch(error => {
            const contactsList = document.getElementById('contactsList');
            contactsList.textContent = `Mae, agarramos esto : ${error.message}`;
        });
}

// Fetch contacts when the page loads
fetchContacts();
