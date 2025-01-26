// Importazione delle librerie
const express = require('express');
const axios = require('axios');
require('dotenv').config();

// Inizializzazione dell'app Express
const app = express();
const port = process.env.PORT || 3000;

// Funzione per ottenere la qualità dell'aria da AirVisual
const getAirQuality = async (city) => {
    const apiKey = process.env.AIRVISUAL_API_KEY;
    const url = `http://api.iqair.com/v1/airquality?city=${city}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching air quality:', error);
        return null;
    }
};

// Funzione per ottenere il meteo da OpenWeatherMap
const getWeather = async (city) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
};

// Route per ottenere informazioni sulla qualità dell'aria e meteo
app.get('/api/info/:city', async (req, res) => {
    const { city } = req.params;

    // Chiamata alle API
    const airQuality = await getAirQuality(city);
    const weather = await getWeather(city);

    if (airQuality && weather) {
        res.json({
            city,
            airQuality: airQuality.data,
            weather: weather.main
        });
    } else {
        res.status(500).json({ error: 'Error fetching data from external APIs' });
    }
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
