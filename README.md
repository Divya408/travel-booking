# Meridian — Travel Booking Website (Frontend Only)


🔗 **Live Demo:** [https://divya408.github.io/travel-booking/](https://divya408.github.io/travel-booking/)


A fully static, frontend-only travel booking website. No backend, database, or API calls — every "Book Now" / "Search" / form submission is a UI-only demo (shows a toast notification).

## Run it
Just open `index.html` in a browser, or serve the folder with VS Code's "Live Server" extension for the best experience (some browsers restrict local file requests for fonts/scripts otherwise).

## Structure
```
travel-booking/
├── index.html          Home
├── about.html          Company story, mission, team, timeline
├── destinations.html   Destination grid with search + category filters
├── hotels.html         Hotel listings with facilities + nightly rate
├── packages.html       Tour packages + custom itinerary request modal
├── contact.html        Contact form + map placeholder
├── css/
│   ├── style.css        Design tokens + all components
│   ├── responsive.css   Mobile / tablet / laptop breakpoints
│   └── animations.css   Keyframes, reveal-on-scroll, reduced-motion support
├── js/
│   ├── main.js          Loader, nav, counters, typing effect, FAQ, filters, modal, toasts
│   ├── darkmode.js      Dark/light theme toggle (persisted in localStorage)
│   ├── validation.js    Booking / contact / newsletter form validation
│   └── slider.js        Swiper.js instances (testimonials, packages)
└── assets/              Local image/icon/video folders (site currently uses hosted stock imagery)
```

## Design concept
"Meridian" is styled around cartography and the boarding pass: coordinate tags under every place name, dotted flight-path lines connecting cards, and package/testimonial cards cut like a torn boarding-pass stub. Palette is deep navy ink + warm sand with a burnt-sienna accent; type pairs a display serif (Fraunces) with a mono face (IBM Plex Mono) for coordinates, prices, and data.

## Third-party libraries (via CDN)
Bootstrap 5 (grid + utilities), Font Awesome 6 (icons), AOS (scroll animations), Swiper 11 (sliders), Google Fonts.

## Notes
- Dark mode, form validation, filtering/search, FAQ accordion, and the custom-itinerary modal are all fully functional client-side.
- Images are pulled from Unsplash/randomuser.me at runtime — swap paths in the HTML for your own assets in `assets/images/` if you need it to work fully offline.
