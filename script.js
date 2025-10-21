// Basic UI interactions: FAB and dialog
const contactFab = document.getElementById('contactFab');
const contactDialog = document.getElementById('contactDialog');
const closeDialogBtn = document.getElementById('closeDialog');
const contactForm = document.getElementById('contactForm');

// Profile image modal
const profileImage = document.getElementById('profileImage');
const profileModal = document.getElementById('profileModal');
const closeProfileModalBtn = document.getElementById('closeProfileModal');

contactFab.addEventListener('click', () => {
  if (typeof contactDialog.showModal === 'function') {
    contactDialog.showModal();
  } else {
    alert('Your browser does not support the dialog element.');
  }
});

closeDialogBtn.addEventListener('click', () => contactDialog.close());

// Profile image click functionality
if (profileImage && profileModal && closeProfileModalBtn) {
  profileImage.addEventListener('click', () => {
    if (typeof profileModal.showModal === 'function') {
      profileModal.showModal();
    } else {
      alert('Your browser does not support the dialog element.');
    }
  });

  closeProfileModalBtn.addEventListener('click', () => profileModal.close());
}

// Contact form submission handler
function handleContactForm(form, submitBtnId, showMessage) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = document.getElementById(submitBtnId);
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Hide any existing messages
    const existingMessages = form.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Submit to Formspree
    fetch('https://formspree.io/f/xnngbveb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value || 'Portfolio Contact',
        message: form.message.value,
        _replyto: form.email.value,
        _subject: `Portfolio Contact from ${form.name.value}`,
      })
    })
    .then(response => {
      if (response.ok) {
        const successMsg = document.createElement('div');
        successMsg.className = 'message message--success show';
        successMsg.textContent = 'Thanks! Your message has been sent successfully. I\'ll get back to you soon!';
        form.insertBefore(successMsg, form.firstChild);
        
        if (showMessage) {
          contactDialog.close();
        }
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      const errorMsg = document.createElement('div');
      errorMsg.className = 'message message--error show';
      errorMsg.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly at seanvillete@gmail.com';
      form.insertBefore(errorMsg, form.firstChild);
    })
    .finally(() => {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });
}

// Handle modal contact form
handleContactForm(contactForm, 'sendMessage', true);

// Handle section contact form
const contactSectionForm = document.getElementById('contactSectionForm');
if (contactSectionForm) {
  handleContactForm(contactSectionForm, 'sendContactMessage', false);
}

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

if (mobileMenuToggle && mobileNavOverlay) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileNavOverlay.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  const mobileNavLinks = mobileNavOverlay.querySelectorAll('a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavOverlay.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === mobileNavOverlay) {
      mobileNavOverlay.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }
  });
}

// Smooth scroll functionality for navigation links
function initSmoothScroll() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate the offset to account for fixed navbar
        const navbarHeight = 60; // Height of the fixed navbar
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        // Smooth scroll to the target element
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if it's open
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileNavOverlay && mobileMenuToggle) {
          mobileNavOverlay.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      }
    });
  });
}

// Initialize smooth scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', initSmoothScroll);

// Certificates functionality
function initCertificates() {
  const certificatesGrid = document.getElementById('certificatesGrid');
  if (!certificatesGrid) return;

  // Your actual certificates data
  const certificates = [
    {
      id: 1,
      title: "JavaScript",
      issuer: "SoloLearn",
      date: "2021",
      image: "certificates/JavaScript.jpg",
      verifyUrl: "https://www.sololearn.com/certificates/CT-IDIL625Q",
      downloadUrl: "certificates/JavaScript.pdf"
    },
    {
      id: 2,
      title: "Front End Development Libraries",
      issuer: "freeCodeCamp",
      date: "2025",
      image: "certificates/Front End Development Libraries.jpg",
      verifyUrl: "https://www.freecodecamp.org/certification/jdevillete/front-end-development-libraries",
      downloadUrl: "certificates/Front End Development Libraries.pdf"
    },
    {
      id: 3,
      title: "Intermediate Python",
      issuer: "SoloLearn",
      date: "2021",
      image: "certificates/Intermediate Python.jpg",
      verifyUrl: "https://www.sololearn.com/certificates/CT-SHHOM9VN",
      downloadUrl: "certificates/Intermediate Python.pdf"
    },
    {
      id: 4,
      title: "Introduction to Front End Development",
      issuer: "Simplilearn | UpSkill",
      date: "2025",
      image: "certificates/Introduction to Front End Development.png",
      verifyUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxOTMzIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQ0ODA1NV84NzkyNTE1MTc0OTUxODgzNDkwNy5wbmciLCJ1c2VybmFtZSI6Ikp1bGlhbiBTZWFuIFAuIFZpbGxldGUifQ%3D%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4511%2FIntroduction-to-Front-End-Development%2Fcertificate%2Fdownload-skillup&%24web_only=true",
      downloadUrl: "certificates/Introduction to Front End Development.pdf"
    },
    {
      id: 5,
      title: "Responsive Web Design",
      issuer: "SoloLearn",
      date: "2021",
      image: "certificates/Responsive Web Design.jpg",
      verifyUrl: "https://www.sololearn.com/certificates/CT-1BUDAMDI",
      downloadUrl: "certificates/Responsive Web Design.pdf"
    },
    {
    id: 6,
      title: "Python for Data Science",
      issuer: "SoloLearn",
      date: "2021",
      image: "certificates/Python for Data Science.jpg",
      verifyUrl: "https://www.sololearn.com/certificates/CT-P4T1VGRB",
      downloadUrl: "certificates/Python for Data Science.pdf"
    }
  ];

  // Function to create certificate card
  function createCertificateCard(cert) {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    card.innerHTML = `
      <div class="certificate-header">
        <div class="certificate-icon">
          <img src="${cert.image}" alt="${cert.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="certificate-fallback" style="display: none;">🏆</div>
        </div>
        <div>
          <h3 class="certificate-title">${cert.title}</h3>
          <p class="certificate-issuer">${cert.issuer}</p>
        </div>
      </div>
      <div class="certificate-date">Issued: ${cert.date}</div>
      <div class="certificate-actions">
        <a href="${cert.downloadUrl}" class="certificate-btn certificate-btn--primary" download>
          📄 Download
        </a>
        <a href="${cert.verifyUrl}" class="certificate-btn" target="_blank" rel="noopener noreferrer">
          🔗 Verify
        </a>
      </div>
    `;

    // Add click handler for the entire card
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking on buttons
      if (!e.target.closest('.certificate-btn')) {
        window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer');
      }
    });

    return card;
  }

  // Function to load certificates
  function loadCertificates() {
    certificatesGrid.innerHTML = '';
    
    if (certificates.length === 0) {
      certificatesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--muted);">
          <p>No certificates available at the moment.</p>
        </div>
      `;
      return;
    }

    certificates.forEach(cert => {
      const card = createCertificateCard(cert);
      certificatesGrid.appendChild(card);
    });
  }

  // Load certificates on page load
  loadCertificates();
}

// Initialize certificates when DOM is loaded
document.addEventListener('DOMContentLoaded', initCertificates);



// Video demo modal functionality
function initVideoDemo() {
  const videoModal = document.getElementById('videoModal');
  const closeVideoModalBtn = document.getElementById('closeVideoModal');
  const demoVideo = document.getElementById('demoVideo');
  if (!videoModal || !closeVideoModalBtn || !demoVideo) return;

  function openVideo(src) {
    // Set source and show modal
    demoVideo.src = src;
    demoVideo.currentTime = 0;
    if (typeof videoModal.showModal === 'function') {
      videoModal.showModal();
      demoVideo.play().catch(() => {/* autoplay might be blocked; controls are visible */});
    } else {
      alert('Your browser does not support the dialog element.');
    }
  }

  function closeVideo() {
    demoVideo.pause();
    demoVideo.removeAttribute('src');
    demoVideo.load();
    videoModal.close();
  }

  // Wire close button
  closeVideoModalBtn.addEventListener('click', closeVideo);

  // Close when clicking outside content
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideo();
    }
  });

  // Find all demo links with data-video
  const demoLinks = document.querySelectorAll('a.chip[data-video]');
  demoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const src = link.getAttribute('data-video');
      if (src) openVideo(src);
    });
  });
}

document.addEventListener('DOMContentLoaded', initVideoDemo);

// Loading Screen functionality
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (!loadingScreen) return;

  // Hide loading screen after page is fully loaded
  function hideLoadingScreen() {
    // Add a minimum display time for better UX (2.5 seconds)
    const minDisplayTime = 2500;
    const startTime = Date.now();
    
    function checkAndHide() {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
      
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition completes
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen);
          }
        }, 800); // Match CSS transition duration
      }, remainingTime);
    }
    
    // Check if page is already loaded
    if (document.readyState === 'complete') {
      checkAndHide();
    } else {
      // Wait for page to fully load
      window.addEventListener('load', checkAndHide);
    }
  }

  // Start the loading screen hide process
  hideLoadingScreen();
}

// Initialize loading screen when DOM is loaded
document.addEventListener('DOMContentLoaded', initLoadingScreen);

