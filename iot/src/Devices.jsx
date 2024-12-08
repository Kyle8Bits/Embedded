import React from 'react'
import { useEffect ,useState} from 'react'
import fan from './images/fan.png'
import sensor from './images/gas_ss.png'
import led from './images/led.png'
import Card from './components/Card'

function Devices() {
  const [signals, setSignals] = useState([])

  useEffect(() => {
    // Fetch the data from the server
    fetch('https://embedded-server-h127nimnq-kyle8bits-projects.vercel.app/signals')
      .then((response) => response.json())
      .then((data) => setSignals(data))
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
