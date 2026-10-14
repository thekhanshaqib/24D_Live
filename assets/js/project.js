const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function applyFilter(filter) {
  // Active button
  filterButtons.forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });

  // Filter cards
  projectCards.forEach(card => {
    const categories = card.dataset.category;

    if (filter === 'all' || categories.includes(filter)) {
      card.classList.remove('hide');
    } else {
      card.classList.add('hide');
    }
  });
}

// 🔹 Existing click behavior
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    applyFilter(btn.dataset.filter);
  });
});

// 🔹 NEW: Apply filter from URL on page load
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const urlFilter = params.get('filter');

  if (urlFilter) {
    applyFilter(urlFilter);
  } else {
    applyFilter('all'); // default
  }
});

// Create and insert tags based on each card's data-category
function createProjectTags() {
  const cards = document.querySelectorAll('.project-card');
  const friendly = {
    ongoing: 'Ongoing',
    completed: 'Completed',
    sole: 'Sole-Selling',
    plotting: 'Plotting'
  };

  cards.forEach(card => {
    const cat = (card.dataset.category || '').trim();
    const label = friendly[cat] || (cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : '');
    if (!label) return;

    const imgWrap = card.querySelector('.project-image');
    if (!imgWrap) return;

    // avoid duplicate tag
    if (imgWrap.querySelector('.project-tag')) return;

    const span = document.createElement('span');
    span.className = 'project-tag';
    span.textContent = label;
    imgWrap.appendChild(span);
  });
}

// ensure tags are created on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  createProjectTags();
});
