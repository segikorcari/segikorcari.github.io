// Personalized Greeting based on Time of Day and Stored User Name
function personalizedGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let timeOfDay;

    if (hours < 12) {
        timeOfDay = "morning";
    } else if (hours < 18) {
        timeOfDay = "afternoon";
    } else {
        timeOfDay = "evening";
    }

    const userName = localStorage.getItem('userName') || 'Guest';
    document.getElementById('greeting').textContent = `Good ${timeOfDay}, ${userName}!`;
}

// Save User Name with Prompt (First-time Visit or Update)
function saveUserName() {
    const name = prompt("Enter your name:");
    if (name) {
        localStorage.setItem('userName', name);
        personalizedGreeting();
    }
}

// Display Last Visit Time and Update on New Visit
function updateVisitTime() {
    const lastVisit = localStorage.getItem('lastVisit');
    if (lastVisit) {
        document.getElementById('last-visit').textContent = lastVisit;
    }
    const now = new Date().toLocaleString();
    localStorage.setItem('lastVisit', now);
}

// Fetch and Display Weather Data
async function fetchWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=42.3314&longitude=-83.0458&current_weather=true');
        const data = await response.json();
        
        // Simple mapping of weather code to description (simplified)
        const weatherDescription = data.current_weather.weathercode === 0 ? 'clear sky' : 'partly cloudy';
        document.getElementById('greeting').textContent += ` - Weather: ${data.current_weather.temperature}°C, ${weatherDescription}`;
    } catch (error) {
        console.log("Could not fetch weather data", error);
    }
}

// Initialize on Page Load
document.addEventListener("DOMContentLoaded", () => {
    personalizedGreeting();
    fetchWeather();
    updateVisitTime();
});
