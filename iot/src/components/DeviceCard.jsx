import React from 'react'
import { useState } from 'react'
import '../style.css'


function DeviceCard() {

    const [led1, setLed1] = useState(true);
    const [led2, setLed2] = useState(false);


    const announce = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    };

    const showAlert = (message) => {
    alert(message); // Browser alert
    };
    
    const handleLed1Change = () => {
        setLed1(!led1);
        announce(`LED 1 is now ${!led1 ? 'ON' : 'OFF'}`);
      };
    
      // Handle state change for LED 2
      const handleLed2Change = () => {
        setLed2(!led2);
        announce(`LED 2 is now ${!led2 ? 'ON' : 'OFF'}`);
      };

    return (
        <div id="card_container">
            <div id="title">Controlling</div>

            <div id='ctrl'>
                <div id="device">LED 1</div>
                <label class="switch">
                    <input type="checkbox" checked={led1} onChange={handleLed1Change}/>
                    <span class="slider round"></span>
                </label>  
            </div>

            <div id='ctrl'>
                <div id="device">LED 2</div>
                <label class="switch">
                    <input type="checkbox" checked={led2} onChange={handleLed2Change}/>
                    <span class="slider round"></span>
                </label>  
            </div>

            <div id='ctrl'>
                <div id="device">FAN</div>
                <label class="switch">
                    <input type="checkbox"/>
                    <span class="slider round"></span>
                </label>  
            </div>

        </div>
    )
}

export default DeviceCard