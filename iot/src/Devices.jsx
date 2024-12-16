import React, { useEffect, useState } from 'react';
import Section from './components/Section';
import './style.css';
import axios from 'axios';
import Notification from './components/Notification';
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate

function Devices() {
  const [devices, setDevices] = useState([]);
  const [notifications, setNotifications] = useState(['No new notifications', '12:00 Turn off red LED']); // Trạng thái thông báo
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('https://embedded-server.vercel.app/devices');
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices', error);
      }
    };

    fetchDevices();
  }, []);

  // Hàm xử lý khi nhấn nút "Back To Homepage"
  const handleBackToHomepage = () => {
    navigate('/'); // Điều hướng về trang chính
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
