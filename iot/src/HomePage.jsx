import React from 'react'
import './style.css'
import Iot from './images/iot.png'
import banner from './images/banner.png'
import Avatar from './images/avatar.png'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/controller');
    }

  return (
    <div id='homepagediv'>
        <div id="welcomelabel">Welcome to IOT</div>

        <div id="dashboard_image">
            <img src={banner} alt="" id="my_img" />
            <h1 id="h1">We All About</h1>
            <h1 id="h2">TAKE FULL CONTROL</h1>
            <h1 id="h3">of Your Home</h1>
            <button id="navigate" onClick={handleNavigate}> Go To Controller</button>
        </div>

        <div id="student_info">
            <div id="information">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros.  </div>
            <img src={Avatar} alt="" id="avatar" />

        </div>
    </div>
  )
}

export default HomePage