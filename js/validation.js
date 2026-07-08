/* ==========================================================================
   MERIDIAN — validation.js
   Frontend-only validation. No backend / no network calls.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  function setInvalid(field, message) {
    field.classList.add('invalid');
    const err = field.querySelector('.field-error');
    if (err) err.textContent = message;
  }
  function setValid(field) {
    field.classList.remove('invalid');
  }

  /* ---------- Booking / search form (home page) ---------- */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const destination = bookingForm.querySelector('#destination');
      const checkin = bookingForm.querySelector('#checkin');
      const checkout = bookingForm.querySelector('#checkout');
      const adults = bookingForm.querySelector('#adults');

      [destination, checkin, checkout, adults].forEach(f => f && setValid(f.closest('.field')));

      if (destination && !destination.value.trim()) {
        setInvalid(destination.closest('.field'), 'Enter a destination');
        valid = false;
      }
      if (checkin && !checkin.value) {
        setInvalid(checkin.closest('.field'), 'Pick a check-in date');
        valid = false;
      }
      if (checkout && !checkout.value) {
        setInvalid(checkout.closest('.field'), 'Pick a check-out date');
        valid = false;
      }
      if (checkin && checkout && checkin.value && checkout.value) {
        if (new Date(checkout.value) <= new Date(checkin.value)) {
          setInvalid(checkout.closest('.field'), 'Must be after check-in');
          valid = false;
        }
      }
      if (adults && (!adults.value || parseInt(adults.value, 10) < 1)) {
        setInvalid(adults.closest('.field'), 'At least 1 adult required');
        valid = false;
      }

      if (valid) {
        showToast('Search complete — showing available stays (UI demo, no backend connected).');
        bookingForm.reset();
      } else {
        showToast('Please fix the highlighted fields.', 'error');
      }
    });
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = contactForm.querySelector('#c-name');
      const email = contactForm.querySelector('#c-email');
      const subject = contactForm.querySelector('#c-subject');
      const message = contactForm.querySelector('#c-message');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      [name, email, subject, message].forEach(f => f && setValid(f.closest('.field')));

      if (name && name.value.trim().length < 2) {
        setInvalid(name.closest('.field'), 'Enter your full name');
        valid = false;
      }
      if (email && !emailPattern.test(email.value.trim())) {
        setInvalid(email.closest('.field'), 'Enter a valid email address');
        valid = false;
      }
      if (subject && subject.value.trim().length < 3) {
        setInvalid(subject.closest('.field'), 'Enter a subject');
        valid = false;
      }
      if (message && message.value.trim().length < 10) {
        setInvalid(message.closest('.field'), 'Message must be at least 10 characters');
        valid = false;
      }

      if (valid) {
        showToast('Message sent — our team will reply within 24 hours (UI demo, no backend connected).');
        contactForm.reset();
      } else {
        showToast('Please fix the highlighted fields.', 'error');
      }
    });
  }

  /* ---------- Newsletter form ---------- */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (input && emailPattern.test(input.value.trim())) {
        showToast('Subscribed — welcome aboard!');
        form.reset();
      } else {
        showToast('Enter a valid email to subscribe.', 'error');
      }
    });
  });

});
