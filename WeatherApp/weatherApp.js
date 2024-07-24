async function getWeather() {
    const apiKey = '93d48d64233b1cf19ce4bd54efe8afcf'; 
    const cityInput = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
    
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.cod === '404') {
        document.getElementById('weatherInfo').innerHTML = 'City not found';
        return;
      }
  
      if (!data.main || !data.main.temp) {
        document.getElementById('weatherInfo').innerHTML = 'Weather data not available';
        return;
      }
      
      const weatherDescription = data.weather[0].description;
      const capitalizedWeatherDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
      const weatherIcon = getWeatherIcon(data.weather[0].main); 

      const weatherInfo = `
      <div class="weather-box">
      <h2>${data.name}, ${data.sys.country} ${weatherIcon}</h2>
      <div class="weather-info-item">Temperature: ${data.main.temp}°C</div>
      <div class="weather-info-item">Feels Like: ${data.main.feels_like}°C</div>
      <div class="weather-info-item">Min Temperature: ${data.main.temp_min}°C</div>
      <div class="weather-info-item">Max Temperature: ${data.main.temp_max}°C</div>
    </div>
    
    <div class="weather-box">
      <div class="weather-info-item">Weather: ${capitalizedWeatherDescription}</div>
      <div class="weather-info-item">Humidity: ${data.main.humidity}%</div>
    </div>
    
    <div class="weather-box">
      <div class="weather-info-item">Wind Speed: ${data.wind.speed} m/s</div>
      <div class="weather-info-item">Visibility: ${data.visibility / 1000} km</div>
    </div>
    
  `;
  
  document.getElementById('weatherInfo').innerHTML = weatherInfo;
  document.getElementById('weatherInfo').style.display = 'block'; 
  

      changeBackground(data.weather[0].main);
    }  catch (error) {
        console.error('Error fetching weather data:', error);
        console.error('Response status:', response.status);
        console.error('Response text:', await response.text());
        document.getElementById('weatherInfo').innerHTML = 'An error occurred';
      }

      function getWeatherIcon(weatherCondition) {
        let iconClass;
        switch (weatherCondition.toLowerCase()) {
            case 'clear':
                iconClass = 'icon/clear.gif'; 
                break;
            case 'clouds':
                iconClass = 'icon/cloud.gif'; 
                break;
            case 'rain':
                iconClass = 'icon/rain.gif'; 
                break;
            case 'snow':
                iconClass = 'icon/snow.gif'; 
                break;
            default:
                iconClass = 'icon/default.gif'; 
        }
        console.log("Background image URL:", iconClass); 
        return `<img src="${iconClass}" alt="${weatherCondition}" class="weather-icon">`; 
    }
      function changeBackground(weatherCondition) {
        let imageUrl;
        switch (weatherCondition.toLowerCase()) {
          case 'clear':
            imageUrl = 'media/clear.jpg';
            break;
          case 'clouds':
            imageUrl = 'media/cloud.jpg';
            break;
          case 'rain':
            imageUrl = 'media/rain.jpg';
            break;
          case 'snow':
            imageUrl = 'media/snow.jpg';
            break;
          default:
            imageUrl = 'media/default.jpg';
        }
      
        console.log("Background image URL:", imageUrl); 
        document.body.style.backgroundImage = `url(${imageUrl})`;
      }
      

  
}