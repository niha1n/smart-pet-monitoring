import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const LandingPage = () => {
  const [sensorData, setSensorData] = useState(null);
  const [pulseRateAlert, setPulseRateAlert] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/sensor-data'
        );
        setSensorData(response.data);
        if(response.data.pulse>=200)
        {setPulseRateAlert(1)
        }
        else{
          setPulseRateAlert(0)
        }
        setLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setLoading(false);
      }
    };
    
    fetchData(); // Fetch initial data
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 second
    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  const locationHandler = async () => {
    const locationResponse = await axios.get(
      'http://localhost:5000/api/location-data'
    );
    console.log(locationResponse);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationResponse.data.latitude},${locationResponse.data.longitude}`;
    window.location.href = googleMapsUrl;
  };

  return (
    <div className="container">
      <h1 className="mt-5">Sensor Data</h1>
      {sensorData ? (
        <>
          <div className="card mt-4">
            <div className="card-body">
              <h6 className="card-title">Pulse Rate: {sensorData.pulse}</h6>
            </div>
            
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h6 className="card-text">
                Status: {pulseRateAlert ? 'Heart Rate Higher than usual!' : 'Safe'}
              </h6>
            </div>
          </div>
          <Button className="mt-4" onClick={locationHandler}>
            Send Current Location
          </Button>
        </>
      ) : (
        <>
        <p className="mt-4">No sensor data available</p>
        <Button className="mt-4" onClick={locationHandler}>
            Last Seen Location
          </Button>
          
          </>
      )}
      <br/>
      <Button className="mt-4 green" onClick={console.log("Food Dispensed")}>
            Dispense Food
          </Button>
    </div>
  );
};

export default LandingPage;
