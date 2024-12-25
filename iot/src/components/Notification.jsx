import React from 'react'
import '../style.css'

function Notification({notifications}) {

  

  return (
    <div id="notification_container">
        <div id="title">Notification</div>
        <div id="notification_content">

        {notifications.slice(0, 10).reverse().map((notification, index) => {
            const isDetected = notification.message.includes("detected");
            const containerId = isDetected ? 'detected' : index % 2 === 0 ? 'odd' : 'even';

            return (
                <div id={containerId} key={index}>
                    <p id='time'>{notification.date} at {notification.time}</p>
                    <p id='message'>{notification.message}</p>
                </div>
            );
        })}

        </div>
    </div>
  )
}

export default Notification