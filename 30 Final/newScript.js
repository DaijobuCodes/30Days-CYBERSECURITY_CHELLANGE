// Function to fetch the JSON data and create day boxes
async function fetchDaysData() {
    try {
        const response = await fetch('./data.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error('Failed to fetch JSON');
        }

        const daysData = await response.json(); // Parse JSON data
        createDayBoxes(daysData); // Call the function to create day boxes
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Function to create and append day boxes to the container
function createDayBoxes(daysData) {
    const container = document.getElementById('days-container');
    if (!container) {
        console.error('Days container not found');
        return; // Exit if the container doesn't exist
    }

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Months are zero-indexed
    const currentYear = currentDate.getFullYear();
    const currentTime = currentDate.getHours() + currentDate.getMinutes() / 60; // Current time in hours

    daysData.forEach(data => {
        const dayDate = new Date(currentYear, currentMonth, data.day); // Create a date object for the data day
        const dayTime = 10; // 10 AM in hours

        const dayBox = document.createElement('div');
        dayBox.className = 'day-box';

        // Check if today is the same day or a previous day
        if (dayDate < currentDate || (dayDate.getDate() === currentDay && currentTime >= dayTime)) {
            // If the date is today after 10 AM or a previous day
            dayBox.innerHTML = `
                <a href="${data.href}" style="color: white; text-decoration: none;">
                    <h3>Day ${data.day}</h3>
                    <p>${data.title}</p>
                </a>
            `;
        } else {
            // If the date is in the future
            dayBox.innerHTML = `
                <a href="comingsoon.html" style="color: white; text-decoration: none;" onclick="showMessage(); scrollToTop(); return false;">
                    <h3>Day ${data.day}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 24 24">
                        <path fill="white" d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9069372 8 4 8.9069372 4 10 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 C 19.093063 22 20 21.093063 20 20 L 20 10 C 20 8.9069372 19.093063 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 12 13 C 10.9 13 10 13.9 10 15 C 10 16.1 10.9 17 12 17 C 13.1 17 14 16.1 14 15 C 14 13.9 13.1 13 12 13 z"></path>
                    </svg>
                </a>
            `;
        }

        container.appendChild(dayBox); // Append the day box to the container
    });
}

// Function to show a message (to be implemented)
function showMessage() {
    const message = document.getElementById('message');
    message.style.display = 'block';
    message.textContent = "The date does not match any active content.";
}

// Function to scroll to the top of the page (to be implemented)
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Call the function to fetch data and create day boxes on page load
document.addEventListener('DOMContentLoaded', fetchDaysData);
