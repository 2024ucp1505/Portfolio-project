const themeToggle = document.querySelector('#theme-toggle');
const htmlElement = document.documentElement;
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

themeToggle.addEventListener('change' , ()=>{
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme' , newTheme);
    localStorage.setItem('theme' , newTheme);
});

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
});

(()=>{
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme){
        htmlElement.setAttribute('data-theme' , savedTheme);
        if(savedTheme == 'dark'){
            themeToggle.checked = true;
        }
    }
})();

const projects = [{
    // The title of the project. This will be displayed as the main heading of the card.
    title: "Portfolio Project (This Website!)",

    // A brief description of the project. Explain the technologies used and its purpose.
    description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",

    // The path to the project's image. The path is relative to the index.html file.
    imageUrl: "./images/project-placeholder-1.jpg",

    // The URL to the live, deployed version of the project.
    liveUrl: "https://your-live-site.com", // Replace with your actual deployed URL when ready

    // The URL to the project's source code on a platform like GitHub.
    codeUrl: "https://github.com/your-username/your-repo-name" // Replace with your actual GitHub repo
  } , 
{
    // The title of the project. This will be displayed as the main heading of the card.
    title: "Portfolio Project (This Website!)",

    // A brief description of the project. Explain the technologies used and its purpose.
    description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",

    // The path to the project's image. The path is relative to the index.html file.
    imageUrl: "./images/project-placeholder-2.jpg",

    // The URL to the live, deployed version of the project.
    liveUrl: "https://your-live-site.com", // Replace with your actual deployed URL when ready

    // The URL to the project's source code on a platform like GitHub.
    codeUrl: "https://github.com/your-username/your-repo-name" // Replace with your actual GitHub repo
  },
{
    // The title of the project. This will be displayed as the main heading of the card.
    title: "Portfolio Project (This Website!)",

    // A brief description of the project. Explain the technologies used and its purpose.
    description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",

    // The path to the project's image. The path is relative to the index.html file.
    imageUrl: "./images/project-placeholder-3.jpg",

    // The URL to the live, deployed version of the project.
    liveUrl: "https://your-live-site.com", // Replace with your actual deployed URL when ready

    // The URL to the project's source code on a platform like GitHub.
    codeUrl: "https://github.com/your-username/your-repo-name" // Replace with your actual GitHub repo
  }];

  const projectContainer = document.querySelector('.projects-container');
  
  const renderProjects = () => {
    let allProjectHTML = '';
    projects.forEach(project => {
        const projectCardHTML = `
      <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${project.imageUrl}" 
              alt="Screenshot of the ${project.title} project" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a 
              href="${project.liveUrl}" 
              class="btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a 
              href="${project.codeUrl}" 
              class="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    `;
     allProjectHTML += projectCardHTML;
    });
    projectContainer.innerHTML = allProjectHTML;
  };


const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

document.addEventListener('DOMContentLoaded' , () => {
    renderProjects();

    if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // 1. Prevent the default form submission behavior (the page redirect).
      event.preventDefault();

      // 2. Collect the form data using the FormData API.
      // This is a modern way to get all form fields.
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Provide immediate user feedback: show a "sending" state.
      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info'; // You could add an .info style for this
      formStatus.style.display = 'block';
      submitButton.disabled = true;

      // 3. Use the fetch API to send the data.
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        // We tell Formspree we want to receive a JSON response.
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        // 4. Handle the response from the server.
        if (response.ok) {
          // Success! Show the success message.
          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';
          // Clear the form fields after a successful submission.
          contactForm.reset();
        } else {
          // The server responded with an error. Try to parse the error message.
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              // This is a validation error from Formspree.
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              // This is a generic server error.
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        // 5. Handle network errors (e.g., user is offline).
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        // Re-enable the submit button regardless of success or failure.
        submitButton.disabled = false;
      });
    });
  }
});


