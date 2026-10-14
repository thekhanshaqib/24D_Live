const brochures = [
  {
    title: "Suyog Rachana",
    description: "Explore thoughtfully planned 1 and 2 BHK homes in Ambegaon, with the project details and lifestyle highlights in one place.",
    image: "assets/images/Suyog_Rachana.jpeg",
    brochureUrl: null
  },
  {
    title: "Suyog Aswini",
    description: "Discover residential plots in Kondhwa Budruk, positioned for buyers looking to invest in a developing Pune corridor.",
    image: "assets/images/Suyog_Ashwini_Apartment.jpeg",
    brochureUrl: null
  }
];

const brochureList = document.getElementById("brochureList");

brochureList.innerHTML = brochures.map((brochure, index) => `
  <article class="brochure-card">
    <div class="brochure-card-image">
      <img src="${brochure.image}" alt="${brochure.title}" loading="lazy">
    </div>
    <div class="brochure-card-content">
      <h2>${brochure.title}</h2>
      <p>${brochure.description}</p>
      ${brochure.brochureUrl
        ? `<a class="btn btn-filled" href="${brochure.brochureUrl}" target="_blank" rel="noopener">Get the Brochure</a>`
        : `<button class="btn btn-filled" type="button" disabled aria-describedby="brochure-status-${index}">Get the Brochure</button>
           <p class="brochure-unavailable" id="brochure-status-${index}">PDF brochure coming soon.</p>`}
    </div>
  </article>
`).join("");