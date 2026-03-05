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

// Scroll Reveal Animation
const revealElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

const projects = [{
    title: "EcoTrack",
    description: "A sustainable habit tracker that helps users reduce their carbon footprint through gamified tasks and data-driven insights.",
    imageUrl: "./images/project-placeholder-1.jpg",
    liveUrl: "#",
    codeUrl: "#",
    tech: ["React", "Node.js", "MongoDB"]
  }, 
  {
    title: "ZenSpace",
    description: "A minimalist meditation and productivity app featuring ambient soundscapes and integrated focus timers.",
    imageUrl: "./images/project-placeholder-2.jpg",
    liveUrl: "#",
    codeUrl: "#",
    tech: ["Next.js", "Tailwind", "Framer Motion"]
  },
  {
    title: "VaultUI",
    description: "A comprehensive design system and component library built for financial applications requiring high security.",
    imageUrl: "./images/project-placeholder-3.jpg",
    liveUrl: "#",
    codeUrl: "#",
    tech: ["TypeScript", "Storybook", "CSS Modules"]
  }];

const renderProjects = () => {
    const projectContainer = document.querySelector('.projects-container');
    if (!projectContainer) return;
    
    let allProjectHTML = '';
    projects.forEach(project => {
        const techPills = project.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');
        const projectCardHTML = `
      <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${project.imageUrl}" 
              alt="${project.title}" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <div class="tech-stack">${techPills}</div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
        <div class="project-links">
          <a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
          <a href="${project.codeUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View Code</a>
        </div>
      </div>
    `;
     allProjectHTML += projectCardHTML;
    });
    projectContainer.innerHTML = allProjectHTML;
};

document.addEventListener('DOMContentLoaded' , () => {
    // Restore theme
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme){
        htmlElement.setAttribute('data-theme' , savedTheme);
        if(savedTheme == 'dark'){
            themeToggle.checked = true;
        }
    }

    renderProjects();
    revealElements();

    const contactForm = document.querySelector('#contact-form');
    const formStatus = document.querySelector('#form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');

            formStatus.innerHTML = 'Sending...';
            formStatus.className = 'info';
            formStatus.style.display = 'block';
            submitButton.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.innerHTML = "Thank you! Your message has been sent.";
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
                        }
                        formStatus.className = 'error';
                    })
                }
            }).catch(error => {
                formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
                formStatus.className = 'error';
            }).finally(() => {
                submitButton.disabled = false;
            });
        });
    }
});
