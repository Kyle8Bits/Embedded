import React from 'react'
import { useEffect ,useState} from 'react'
import Section from './components/Section'
import './style.css'
import axios from 'axios';

function Devices() {
  
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/devices');
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices', error);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div id="main_page">
       <div id="card_container">
            <div id="title">Controlling</div>
            {devices.map((device, index) => (
              <Section key={index} name={device.name} status={device.status} isActive={device.isActive} location={device.location} id={device.id}/>
            ))}
        </div>
    </div>
  )
}

export default Devices
