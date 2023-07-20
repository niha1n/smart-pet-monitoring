import axios from 'axios';


const ESP32_IP_ADDRESS = '192.168.1.35'; // Replace with the IP address of your ESP32

export async function rotateServoAndBack() {
  try {
    // Rotate servo to 90 degrees
    await axios.get(`http://${ESP32_IP_ADDRESS}/servo/counterclockwise`);

    // Hold for 2 seconds
    await delay(2000);

    // Rotate servo back to 0 degrees
    await axios.get(`http://${ESP32_IP_ADDRESS}/servo/clockwise`);
  } catch (error) {
    console.error('Error controlling the servo:', error.message);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

