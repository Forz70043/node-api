async function fetchData() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.style.display = 'none';
    resultsContainer.innerHTML = 'Loading...';
  
    try {
        const response = await fetch('/api/info');
        const data = await response.json();
        if (data.error) {
            resultsContainer.innerHTML = `<p class="error">${data.error}</p>`;
            resultsContainer.style.display = 'block';
            return;
        }
  
        const { city, state, country, location, current } = data.data;
        const { pollution, weather } = current;
  
        resultsContainer.innerHTML = `
            <h2>Location: ${city}, ${state}, ${country}</h2>
            
            <h3>Coordinates:</h3>
            <p><strong>Longitude:</strong> ${location.coordinates[0]}</p>
            <p><strong>Latitude:</strong> ${location.coordinates[1]}</p>
            
            <h3>Air Quality:</h3>
            <p><strong>AQI (Air Quality Index):</strong> ${pollution.aqius}</p>
            <p><strong>Main Pollutant:</strong> ${pollution.mainus}</p>
            <p><strong>Pollution Level (AQI CN):</strong> ${pollution.aqicn}</p>
            <p><strong>Main Pollutant (CN):</strong> ${pollution.maincn}</p>
            <p><strong>Timestamp:</strong> ${pollution.ts}</p>
    
            <h3>Weather:</h3>
            <p><strong>Temperature (°C):</strong> ${weather.tp}</p>
            <p><strong>Pressure (hPa):</strong> ${weather.pr}</p>
            <p><strong>Humidity (%):</strong> ${weather.hu}</p>
            <p><strong>Wind Speed (m/s):</strong> ${weather.ws}</p>
            <p><strong>Wind Direction (°):</strong> ${weather.wd}</p>
            <p><strong>Weather Icon:</strong> <img src="https://www.weatherbit.io/static/img/icons/${weather.ic || 'default'}.png" alt="weather icon" /></p>
            <p><strong>Weather Timestamp:</strong> ${weather.ts}</p>
        `;
      
        resultsContainer.style.display = 'block';
    } catch (error) {
        console.log("ERROR: ",error);
        resultsContainer.innerHTML = `<p class="error">Error fetching data. Please try again later.</p>`;
        resultsContainer.style.display = 'block';
    }
}