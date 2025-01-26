const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const getAirQuality = async () => {
    const apiKey = process.env.AIRVISUAL_API_KEY;
    const url = `http://api.airvisual.com/v2/nearest_city?key=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching air quality:', error);
        return null;
    }
};

app.get('/api/info', async (req, res) => {
    const airQualityData = await getAirQuality();
    
    if (airQualityData) {
        const { city, state, country, location, current } = airQualityData.data;
        const { pollution, weather } = current;

        // Costruzione della risposta da inviare al frontend
        res.json({
            status: airQualityData.status,
            data: {
                city: city,
                state: state,
                country: country,
                location: location,
                current: {
                    pollution: {
                        ts: pollution.ts,
                        aqius: pollution.aqius,
                        mainus: pollution.mainus,
                        aqicn: pollution.aqicn,
                        maincn: pollution.maincn
                    },
                    weather: {
                        ts: weather.ts,
                        tp: weather.tp,
                        pr: weather.pr,
                        hu: weather.hu,
                        ws: weather.ws,
                        wd: weather.wd,
                        ic: weather.ic
                    }
                }
            }
        });
    } else {
        // Se c'è un errore nel recuperare i dati, restituiamo un errore
        res.status(500).json({ error: 'Error fetching air quality data' });
    }
});

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
