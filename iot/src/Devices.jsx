import React from 'react'
import { useEffect ,useState} from 'react'
import fan from './images/fan.png'
import sensor from './images/gas_ss.png'
import led from './images/led.png'
import DeviceCard from './components/DeviceCard'
import './style.css'

function Devices() {
  // const [signals, setSignals] = useState([])

  // useEffect(() => {
  //   // Fetch the data from the server with the token in the header
  //   fetch('https://embedded-server.vercel.app/signals')
  //     .then((response) => {
  //       if (!response.ok) {
  //         // If response is not OK, log the error and throw an exception
  //         throw new Error(`Unauthorized: ${response.status}`);
  //       }
  //       return response.json(); // If OK, parse the response body
  //     })
  //     .then((data) => setSignals(data)) // Set the signals in state
  //     .catch((error) => console.error('Error fetching signals:', error));
  // }, []);

  const imageMap = {
    Fan: fan,
    Sensor: sensor,
    Led: led,
  };

  return (
    <div id="main_page">
   {/* {signals.map((signal) => (
        <Card
          // key={signal._id} // Use the signal's unique ID as the key
          // status={signal.status}
          // img={imageMap[signal.type]} // Dynamically select the image based on the signal type
          // name={signal.name}
          // id={signal._id} // Use the signal's ID
        />
      ))} */}

      <DeviceCard/>
    </div>
  )
}

export default Devices
