import React from 'react'
import { useEffect ,useState} from 'react'
import fan from './images/fan.png'
import sensor from './images/gas_ss.png'
import led from './images/led.png'
import Card from './components/Card'

function Devices() {
  const [signals, setSignals] = useState([])

  useEffect(() => {
    // Fetch the data from the server with the token in the header
    fetch('https://embedded-server-h127nimnq-kyle8bits-projects.vercel.app/signals', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer wWa8rXsXzrnss8wCXP6xvNwX`,  // Replace with your token
      },
      mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
          // If response is not OK, log the error and throw an exception
          throw new Error(`Unauthorized: ${response.status}`);
        }
        return response.json(); // If OK, parse the response body
      })
      .then((data) => setSignals(data)) // Set the signals in state
      .catch((error) => console.error('Error fetching signals:', error));
  }, []);

  const imageMap = {
    Fan: fan,
    Sensor: sensor,
    Led: led,
  };

  return (
    <div>
   {signals.map((signal) => (
        <Card
          key={signal._id} // Use the signal's unique ID as the key
          status={signal.status}
          img={imageMap[signal.type]} // Dynamically select the image based on the signal type
          name={signal.name}
          id={signal._id} // Use the signal's ID
        />
      ))}
    </div>
  )
}

export default Devices
