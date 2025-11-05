const apiKey = 'c84804e741c14d8d848221649250511'; // Replace with your actual API key
const getWeatherBtn = document.getElementById('get-weather-btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const cityInput = document.getElementById('city-input');

console.log('Button element:', getWeatherBtn); // Check if this is null
console.log('Input element:', cityInput);     // Check if this is null

// ... (rest of the script) ...

getWeatherBtn.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        fetchWeatherData(cityName);
    } else {
        alert('Please enter a city name.');
    }
});

// Add event listener to the input field for the 'keydown' event
cityInput.addEventListener('keydown', function(event) {
    // Check if the key pressed is the 'Enter' key
    if (event.key === 'Enter') {
        // Prevent the default action (e.g., form submission and page reload)
        event.preventDefault();
        
        // Trigger the button click event programmatically
        getWeatherBtn.click();
    }
}
)

async function fetchWeatherData(cityName) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found or API error');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        locationElement.textContent = 'Error: City not found';
        temperatureElement.textContent = '';
        descriptionElement.textContent = '';
    }
}

function displayWeatherData(data) {
    // Extract necessary information from the API response
    const locationName = data.location.name + ', ' + data.location.country;
    const temperatureC = data.current.temp_c;
    const weatherDescription = data.current.condition.text;
    
    // Update the HTML elements with the data
    locationElement.textContent = locationName;
    temperatureElement.textContent = `Temperature: ${temperatureC}°C`;
    descriptionElement.textContent = `Condition: ${weatherDescription}`;
}