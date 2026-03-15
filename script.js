const graphData = {
    1: {
        title: 'Global Temperature Spike',
        src: 'graph_1.png',
        alt: 'Graph showing global temperature changes over time',
        caption: 'Global surface temperatures were stable until the late 1800s, then rose +1.0°C since 1970.',
    },
    2: {
        title: 'Greenhouse Gas Concentrations',
        src: 'graph_2.jpg',
        alt: 'Graph showing 2,000 years of greenhouse gas concentrations.',
        caption: 'CO₂, methane, and nitrous oxide remained stable for centuries, then spiked sharply with industrialization.',
    },
    3: {
        title: '800,000 Years of CO2',
        src: 'graph_3.png',
        alt: 'Graph showing CO₂ over 800,000 years.',
        caption: 'CO₂ levels never exceeded ~300 ppm until the last 150 years, now at 422.8 ppm.',
    },
};

const modal = document.getElementById('graphModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
let currentGraphId = null;

function scrollToEvidence() {
    document.getElementById('evidence').scrollIntoView({ behavior: 'smooth' });
}

function openGraphModal(id) {
    const graph = graphData[id];
    if (!graph) return;

    currentGraphId = id;
    modalTitle.textContent = graph.title;
    modalImage.src = graph.src;
    modalImage.alt = graph.alt;
    modalCaption.textContent = graph.caption;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function toggleDetails(id) {
    const details = document.getElementById(`details-${id}`);
    if (!details) return;
    details.classList.toggle('hidden');
}

function toggleMobileNav() {
    const nav = document.getElementById('navLinks');
    if (!nav) return;
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    const button = document.getElementById('themeToggle');
    if (button) button.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('climateTheme', isLight ? 'light' : 'dark');
}

function applyStoredTheme() {
    const stored = localStorage.getItem('climateTheme');
    if (stored === 'light') {
        document.body.classList.add('light-theme');
        const button = document.getElementById('themeToggle');
        if (button) button.textContent = '☀️';
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateScrollButton() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    if (window.scrollY > window.innerHeight / 2) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
}

function openSources() {
    const sources = [
        'NASA GISS Surface Temperature Analysis',
        'NOAA Global Climate Report',
        'IPCC Assessment Reports',
        'Mauna Loa CO₂ Measurements',
    ];
    const list = sources.map(s => `• ${s}`).join('\n');
    window.open(`Data Sources:\n\n${list}`, '_blank');
}

function downloadGraph() {
    if (!currentGraphId) return;
    const graph = graphData[currentGraphId];
    if (!graph) return;

    const link = document.createElement('a');
    link.href = graph.src;
    link.download = graph.src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function shareGraph() {
    if (!currentGraphId) return;
    const graph = graphData[currentGraphId];
    if (!graph) return;

    if (navigator.share) {
        navigator.share({
            title: graph.title,
            text: graph.caption,
            url: window.location.href,
        }).catch(() => {});
    } else {
        alert('Sharing is not supported on this device. Copy the URL to share.');
    }
}

window.addEventListener('scroll', updateScrollButton);
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
});

applyStoredTheme();