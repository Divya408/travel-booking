/* ==========================================================================
   MERIDIAN — slider.js
   Swiper.js instances: testimonials slider + featured destinations slider.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof Swiper === 'undefined') return;

  if (document.querySelector('.testimonial-swiper')) {
    new Swiper('.testimonial-swiper', {
      loop: true,
      spaceBetween: 28,
      slidesPerView: 1,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.testimonial-swiper .swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 }
      }
    });
  }

  if (document.querySelector('.featured-swiper')) {
    new Swiper('.featured-swiper', {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 1.1,
      centeredSlides: false,
      autoplay: { delay: 4200, disableOnInteraction: false },
      navigation: {
        nextEl: '.featured-swiper-next',
        prevEl: '.featured-swiper-prev'
      },
      breakpoints: {
        640: { slidesPerView: 1.6 },
        992: { slidesPerView: 2.4 },
        1300: { slidesPerView: 3.2 }
      }
    });
  }

  if (document.querySelector('.gallery-swiper')) {
    new Swiper('.gallery-swiper', {
      loop: true,
      spaceBetween: 16,
      slidesPerView: 1.2,
      breakpoints: {
        640: { slidesPerView: 2.2 },
        992: { slidesPerView: 3.2 }
      }
    });
  }

});
