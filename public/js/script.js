const muns = document.querySelectorAll('.mun-card');
const emptyState = document.getElementById('empty-state');
const munGrid = document.getElementById('mun-grid');

if (muns.length === 0) {
    emptyState.style.display = 'block';
    munGrid.style.display = 'none';
}

function showSection(sectionId, element) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Update sidebar active state
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    // Update header title
    const headerTitle = document.querySelector('.content-header h1');

    if (element.textContent.trim() === "Overview") {
        headerTitle.textContent = "Conference Overview";
    } else {
        headerTitle.textContent = element.textContent;
    }
}