// JavaScript animations for a smoother user experience
window.addEventListener('DOMContentLoaded', (event) => {
    const elements = document.querySelectorAll('.step, .real-life-example, .needs-impact, .implementation');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }, index * 300);
    });
});

function showMessage() {
    // Get the paragraph element by ID and make it visible
    document.getElementById("message").style.display = "block";
}