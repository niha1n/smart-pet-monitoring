import { config } from 'dotenv';
config();
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export function sendMotionAlert() {
  

  const messageBody = `Attention: Heart Rate of your pet is HIGHER tha usual`;

  client.messages
    .create({
      body: messageBody,
      from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
      to: 'whatsapp:+918281537869', // Recipient's WhatsApp number
    })
    .then((message) => console.log('Message sent:', message.sid))
    .catch((err) => console.error('Error:', err));
}
