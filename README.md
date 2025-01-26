# node-api

A simple Node.js project that queries multiple external APIs to get real-time data on air quality and weather for a given city.

## Requirements

- Node.js
- NPM
- API keys from:
  - [AirVisual API](https://www.iqair.com/world-air-quality)
  - [OpenWeather API](https://openweathermap.org/api)

## Setup

1. Clone this repository:

```bash
git clone https://github.com/yourusername/node-api.git
cd node-api
```

2. Install dependencies:
```
npm install
```
Create a .env file with your API keys:
```
AIRVISUAL_API_KEY=your_airvisual_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
```
Run the app:
```
node index.js
```

Visit the endpoint in your browser or make a GET request:

http://localhost:3000/api/info/{city}

Replace {city} with the name of the city (e.g., London).
License

MIT License
