import express from 'express';
import bodyParser from 'body-parser';
import { sendMotionAlert } from './alertHandler.js';

const app = express();

// CORS configuration
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Parse JSON request body
app.use(bodyParser.json());

// Store the sensor data
let sensorData = null;
let lastLatitude = 8.546;
let lastLongitude = 75.67;

let isMotionAlertSent = false;

// API endpoint to receive sensor data

app.post('/sensor-data', (req, res) => {
  sensorData = req.body;
  if (!isMotionAlertSent && sensorData.pulse>=200) {
    sendMotionAlert();
    isMotionAlertSent = true;
  } else if (isMotionAlertSent && sensorData.pulse>=200) {
    isMotionAlertSent = false;
  }
  res.status(200).send('Data received successfully');
});

//API endpoint to receive location data
app.post('/location-data', (req, res) => {
  try {
    const locationData = req.body;

    // Check if the received data is not empty
    if (Object.keys(locationData).length === 0) {
      res.status(400).send('Empty location data');
      return;
    }

    // Extract latitude and longitude from the received data
    const latitude = locationData.latitude;
    const longitude = locationData.longitude;

    // Update the last seen latitude and longitude
    lastLatitude = latitude;
    lastLongitude = longitude;

    // Process and store the received GPS data as needed

    res.status(200).send('Data received successfully');
  } catch (error) {
    console.error('Error processing GPS data:', error);
    res.status(500).send('Error processing GPS data');
  }
});

// API endpoint to get sensor data
app.get('/api/sensor-data', (req, res) => {
  if (sensorData) {
    res.json(sensorData);
  } else {
    res.status(404).json({ error: 'No sensor data available' });
  }
});

app.get('/api/location-data', (req, res) => {
  if (lastLatitude && lastLongitude) {
    const location = {
      latitude: lastLatitude,
      longitude: lastLongitude,
    };
    res.json(location);
  } else {
    res.status(404).json({ error: 'No location data available' });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
