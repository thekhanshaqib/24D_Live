
const filters = {
  location: document.getElementById('locationFilter'),
  budget: document.getElementById('budgetFilter'),
  status: document.getElementById('statusFilter')
};

const card = document.querySelector('.d24d-exclusive-card');

function applyFilters() {
  const match =
    (filters.location.value === 'all' || card.dataset.location === filters.location.value) &&
    (filters.budget.value === 'all' || card.dataset.budget === filters.budget.value) &&
    (filters.status.value === 'all' || card.dataset.status === filters.status.value);

  card.style.display = match ? 'grid' : 'none';
}

Object.values(filters).forEach(filter =>
  filter.addEventListener('change', applyFilters)
);

document.getElementById('resetFilters').addEventListener('click', () => {
  Object.values(filters).forEach(filter => filter.value = 'all');
  applyFilters();
});