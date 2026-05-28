const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const popup = document.getElementById('popup');
const contactForm = document.getElementById('contactForm');
const closePopup = document.getElementById('closePopup');

function updateCursorPosition(event) {
  const x = `${event.clientX}px`;
  const y = `${event.clientY}px`;
  cursor.style.left = ring.style.left = x;
  cursor.style.top = ring.style.top = y;
}

function setCursorHoverState(isHovering) {
  const scale = isHovering ? 1.4 : 1;
  const ringScale = isHovering ? 1.05 : 1;
  const borderColor = isHovering ? 'rgba(110,231,247,0.8)' : 'rgba(110,231,247,0.5)';

  cursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
  ring.style.transform = `translate(-50%, -50%) scale(${ringScale})`;
  ring.style.borderColor = borderColor;
}

function toggleMobileMenu() {
  const isOpen = hamburger.classList.toggle('open');
  mainNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen.toString());
}

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mainNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

function handleNavigationClick() {
  closeMobileMenu();
}

function handleDocumentClick(event) {
  if (!hamburger.contains(event.target) && !mainNav.contains(event.target)) {
    closeMobileMenu();
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert('Email invalide.');
    return;
  }

  popup.classList.add('active');
  contactForm.reset();
}

function closePopupWindow() {
  popup.classList.remove('active');
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closePopupWindow();
  }
}

function attachHoverListeners() {
  document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => setCursorHoverState(true));
    element.addEventListener('mouseleave', () => setCursorHoverState(false));
  });
}

function setupScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.service-card, .project-card').forEach((card) => {
    observer.observe(card);
  });
}

function init() {
  document.addEventListener('mousemove', updateCursorPosition);
  attachHoverListeners();

  hamburger.addEventListener('click', toggleMobileMenu);
  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', handleNavigationClick));
  document.addEventListener('click', handleDocumentClick);

  contactForm.addEventListener('submit', handleFormSubmit);
  closePopup.addEventListener('click', closePopupWindow);
  document.addEventListener('keydown', handleEscapeKey);

  setupScrollReveal();
}

init();
