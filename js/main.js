/**
 * COORG HOLIDAYS - Main Interactive Scripts
 * Handles WhatsApp quotation formulation, mobile navigation, FAQ toggling, and modal controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '918050500030';
  const PHONE_NUMBER = '+918050500030';

  // 1. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileClose');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 2. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close other open FAQs
      document.querySelectorAll('.faq-item').forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });

  // 3. Modal Popup for Custom Quotes
  const quoteModal = document.getElementById('quoteModal');
  const openModalBtns = document.querySelectorAll('.btn-open-quote-modal');
  const closeModalBtns = document.querySelectorAll('.modal-close, .btn-modal-close');

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const defaultPackage = btn.getAttribute('data-package') || '';
      const modalPkgSelect = document.getElementById('modalPackage');
      if (modalPkgSelect && defaultPackage) {
        modalPkgSelect.value = defaultPackage;
      }
      if (quoteModal) {
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (quoteModal) {
        quoteModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 4. Helper Function: Generate and Open WhatsApp Message
  function handleWhatsAppFormSubmit(form) {
    const name = form.querySelector('[name="name"]')?.value.trim() || 'Traveller';
    const pickup = form.querySelector('[name="pickup"]')?.value.trim() || 'Mysore';
    const destination = form.querySelector('[name="destination"]')?.value.trim() || 'Coorg';
    const pkg = form.querySelector('[name="package"]')?.value.trim() || destination;
    const travelDate = form.querySelector('[name="travelDate"]')?.value.trim() || 'Flexible / Upcoming';
    const adults = form.querySelector('[name="adults"]')?.value.trim() || '2';
    const children = form.querySelector('[name="children"]')?.value.trim() || '0';
    const stayType = form.querySelector('[name="stayType"]')?.value.trim() || 'Standard';
    const notes = form.querySelector('[name="notes"]')?.value.trim() || '';

    let message = `Hello Coorg Holidays,\nI would like to enquire about a tour package quotation.\n\n`;
    message += `*Name:* ${name}\n`;
    message += `*Package / Destination:* ${pkg}\n`;
    message += `*Pickup City:* ${pickup}\n`;
    message += `*Travel Date:* ${travelDate}\n`;
    message += `*Adults:* ${adults} | *Children:* ${children}\n`;
    message += `*Stay Preference:* ${stayType}\n`;
    if (notes) {
      message += `*Notes / Requirements:* ${notes}\n`;
    }
    message += `\nPlease send available itinerary details, hotel options and package price. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Track conversion event if GTM/GA is active
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: 'whatsapp_enquiry_submit',
        package_name: pkg,
        pickup_city: pickup
      });
    }

    window.open(waUrl, '_blank');
  }

  // 5. Taxi / Cab Specific Quote Handler
  function handleTaxiFormSubmit(form) {
    const name = form.querySelector('[name="name"]')?.value.trim() || 'Traveller';
    const vehicle = form.querySelector('[name="vehicle"]')?.value.trim() || 'Tempo Traveller (TT)';
    const tripType = form.querySelector('[name="tripType"]')?.value.trim() || 'Outstation Round Trip';
    const pickupCity = form.querySelector('[name="pickupCity"]')?.value.trim() || 'Bangalore';
    const destination = form.querySelector('[name="destination"]')?.value.trim() || 'Coorg';
    const travelDate = form.querySelector('[name="travelDate"]')?.value.trim() || 'Flexible / Upcoming';
    const passengers = form.querySelector('[name="passengers"]')?.value.trim() || 'Family / Group';
    const notes = form.querySelector('[name="notes"]')?.value.trim() || '';

    let message = `Hello Coorg Holidays Taxi Service,\nI would like to enquire about a cab / taxi booking quotation.\n\n`;
    message += `*Preferred Vehicle:* ${vehicle}\n`;
    message += `*Trip Type:* ${tripType}\n`;
    message += `*Pickup City:* ${pickupCity}\n`;
    message += `*Destination / Route:* ${destination}\n`;
    message += `*Travel Date:* ${travelDate}\n`;
    message += `*Passengers:* ${passengers}\n`;
    if (name && name !== 'Traveller') {
      message += `*Customer Name:* ${name}\n`;
    }
    if (notes) {
      message += `*Special Requirements:* ${notes}\n`;
    }
    message += `\nPlease share fare quotation, driver beta & availability. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: 'taxi_enquiry_submit',
        vehicle_type: vehicle,
        trip_type: tripType,
        pickup_city: pickupCity,
        destination: destination
      });
    }

    window.open(waUrl, '_blank');
  }

  // Attach Taxi Forms
  const taxiForms = document.querySelectorAll('.taxi-quote-form');
  taxiForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleTaxiFormSubmit(form);
    });
  });

  // 6. Attach General Forms
  const forms = document.querySelectorAll('.whatsapp-quote-form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleWhatsAppFormSubmit(form);
    });
  });

  // 7. Direct Quick WhatsApp Buttons
  const quickWaBtns = document.querySelectorAll('.btn-quick-wa');
  quickWaBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package') || 'Karnataka Tour Package';
      const text = `Hello Coorg Holidays, I am interested in the "${packageName}". Please share itinerary, vehicle options and price.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    });
  });

  // 8. Package Hub Live Filter
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const durationChips = document.querySelectorAll('.duration-chip');
  const pkgCards = document.querySelectorAll('.pkg-hub-card');

  let activeCircuit = 'all';
  let activeDuration = 'all';

  function applyPackageFilters() {
    pkgCards.forEach((card) => {
      const cardCircuit = card.getAttribute('data-circuit') || '';
      const cardDuration = card.getAttribute('data-duration') || '';

      const matchCircuit = (activeCircuit === 'all' || cardCircuit === activeCircuit);
      const matchDuration = (activeDuration === 'all' || cardDuration === activeDuration);

      if (matchCircuit && matchDuration) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeCircuit = btn.getAttribute('data-filter') || 'all';
        applyPackageFilters();
      });
    });
  }

  if (durationChips.length > 0) {
    durationChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        durationChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        activeDuration = chip.getAttribute('data-duration-filter') || 'all';
        applyPackageFilters();
      });
    });
  }
});


