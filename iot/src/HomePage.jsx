import React from 'react';
import './style.css';
import Iot from './images/iot.png';
import banner from './images/banner.png';
import Avatar from './images/avatar.png';
import logo from './images/logo.png'; // Nhập logo
import Footer from './components/Footer';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/controller');
    };

    return (
        <div id='homepagediv'>
            <header id="welcomelabel">
                <img src={logo} alt="Smart Home Logo" id="logo" />
                <div id="welcome-text">Welcome to your home</div>
            </header>

            <div id="dashboard_image">
                <img src={banner} alt="Home Banner" id="my_img" />
                <h1 id="h1">We All About</h1>
                <h1 id="h2">TAKE FULL CONTROL</h1>
                <h1 id="h3">Of Your Home</h1>
                <button id="navigate" onClick={handleNavigate}>Go To Controller</button>
            </div>

            <section id="student_info">
                <div id="information">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed tempus eros.
                </div>
                <img src={Avatar} alt="User Avatar" id="avatar" />
            </section>

            <Footer/>
        </div>
    );
}

export default HomePage;
