import React, { useEffect, useState } from 'react';
import Section from './components/Section';
import './style.css';
import axios from 'axios';
import Notification from './components/Notification';
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate

function Devices() {
  const [devices, setDevices] = useState([]);
  const [notifications, setNotifications] = useState([]); // Trạng thái thông báo
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const fetchNotifications = async () => {
    try {
      // const response = await axios.get('https://embedded-server.vercel.app/notifications');
      const response = await axios.get('http://localhost:3000/notifications'); 
      setNotifications(response.data);
 
    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  }

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // const response = await axios.get('https://embedded-server.vercel.app/devices');
        const response = await axios.get('http://localhost:3000/devices'); 
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices', error);
      }
    };
    fetchNotifications();
    fetchDevices();
  }, []);


  const handleBackToHomepage = () => {
    navigate('/'); 
  };

  return (
    <div id="main_page">
      <div id="card_container">
        <div id="title">Controlling</div>
        {devices.map((device, index) => (
          <Section 
            key={index} 
            name={device.name} 
            status={device.status} 
            isActive={device.isActive} 
            location={device.location} 
            id={device.id}
            fetchNotifications={fetchNotifications}
          />
        ))}
      </div>

      <Notification notifications={notifications}/>

      <button onClick={handleBackToHomepage} id="back_button">
        Back To Homepage
      </button>
    </div>
  );
}

export default Devices;
