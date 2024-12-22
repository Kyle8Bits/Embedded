import React from 'react'
import '../style.css'
import { useState } from 'react';
import axios from 'axios';


function Section({name, status, isActive, location, id}) {

    const [led1, setLed1] = useState(status === 'ON' ? true : false);

    const announce = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    };  

    const handleLed1Change = async () => {
        const newStatus = !led1 ? 'ON' : 'OFF';
        setLed1(!led1);
        announce(`LED 1 is now ${newStatus}`);

        try {
            await axios.put(`http://localhost:3000/devices/${id}`, { status: newStatus });
        } catch (error) {
            console.error('Error updating device status', error);
        }
    };


  return (
    <div id='ctrl'>
        <div id="device">{name}</div>
        <label className="switch">
            <input type="checkbox" checked={led1} onChange={handleLed1Change}/>
            <span className="slider round"></span>
        </label>  
    </div>
  )
}

export default Section
