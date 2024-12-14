import React from 'react'
import './style.css'
import Iot from './images/iot.png'
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
            <img src={Iot} alt="" id="my_img" />
            <p id="des">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. Nulla tincidunt feugiat blandit. Nullam rhoncus turpis et augue consectetur tincidunt. In hac habitasse platea dictumst. Aenean mollis laoreet tempor. Nullam porta, dolor at sagittis dapibus, leo mi sagittis ipsum, ut bibendum diam metus nec justo. In nec suscipit nulla. Maecenas quis sem volutpat tortor gravida auctor vitae id leo. Duis vitae euismod libero. Vestibulum aliquet vehicula suscipit. Aliquam neque neque, imperdiet quis fringilla sit amet, placerat eu libero. Nulla facilisi.</p>
        </div>

        <div id="student_info">
            <div id="information">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. orem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros.  </div>
            <img src={Avatar} alt="" id="avatar" />
            <button id="navigate" onClick={handleNavigate}> Go To Controller</button>
        </div>

    </div>
  )
}

export default HomePage