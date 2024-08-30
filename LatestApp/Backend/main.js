import express from 'express'

const app = express()

// GET endpoint
function fetchContacts() {
    fetch('http://localhost:3000/       ')
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

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});