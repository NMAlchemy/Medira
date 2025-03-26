document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidePanel = document.getElementById('sidePanel');

    // Toggle the side panel on button click
    toggleBtn.addEventListener('click', () => {
        sidePanel.classList.toggle('open');
    });

    // Optional: Close panel when clicking outside
    document.addEventListener('click', (event) => {
        if (!sidePanel.contains(event.target) && event.target !== toggleBtn) {
            sidePanel.classList.remove('open');
        }
    });
});
