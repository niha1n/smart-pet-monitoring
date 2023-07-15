# Smart Pet Monitoring System

This IoT-based solution allows pet owners to monitor their pet's health, location, and activity levels in real-time.

## Features

* Real-time monitoring of pet's health parameters such as pulse rate.
* Location tracking of the pet using GPS data.
* Motion detection and alerts.
* User-friendly web interface to view and control the system.
* Integration with a smart pet vest and pet feeder for enhanced functionality.

## Architecture

The system consists of the following components:

* ESP32 Board: Collects sensor data, including pulse rate and GPS coordinates, from the pet vest.
* React Frontend: Displays real-time information, including the pet's health data and location, and allows for remote control of the pet feeder.
* Node.js Server: Acts as the backend server to receive and process data from the ESP32 board and serve API endpoints for the React frontend.

## Installation and Setup

1. Clone the repository.
2. Set up the ESP32 board with appropriate firmware to collect and transmit sensor data.
3. Install the necessary dependencies for the React frontend by running `npm install` in the `frontend` directory.
4. Start the server by running `npm start` in the root directory.
5. Launch the React frontend by running `npm start` in the `frontend` directory.
6. Access the web application in a browser at `http://localhost:3000`.

## API Endpoints

* `/sensor-data`: POST endpoint to receive sensor data from the ESP32 board.
* `/location-data`: POST endpoint to receive location data from the ESP32 board.
* `/api/sensor-data`: GET endpoint to retrieve the latest sensor data.
* `/api/location-data`: GET endpoint to retrieve the last known location data.

## Contributing

Contributions to the Smart Pet Monitoring System are welcome! If you have any ideas or suggestions, please submit a pull request or open an issue.

## License

This project is licensed under the [MIT License](/LICENSE).
