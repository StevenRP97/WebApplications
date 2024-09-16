class MyComponent extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Create a wrapper element
    const wrapper = document.createElement('div');
    wrapper.classList.add('my-component-container');

    // Load content from an external file
    fetch('content.html')
      .then(response => response.text())
      .then(data => {
        wrapper.innerHTML = data;  // Insert the external content into the wrapper
      })
      .catch(error => console.error('Error loading content:', error));

    // Append the wrapper to the shadow DOM
    shadow.appendChild(wrapper);
  }
}

// Define the custom element
customElements.define('my-component', MyComponent);

