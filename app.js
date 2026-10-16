const mockKpis = [
  { label: 'Total requests', value: '12.8K' },
  { label: 'Approved routes', value: '42' },
  { label: 'API keys active', value: '17' },
  { label: 'Audit events', value: '3.1K' },
];

const content = document.getElementById('content');
const title = document.getElementById('title');

function renderOverview() {
  title.textContent = 'Overview';
  content.innerHTML = mockKpis
    .map(k => `<article class="card"><div class="kpi">${k.value}</div><p>${k.label}</p></article>`)
    .join('');
}

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
});

renderOverview();
