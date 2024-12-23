import React from 'react'
import '../style.css'

function Notification({notifications}) {
  return (
    <div id="notification_container">
        <div id="title">Notification</div>
        <div id="notification_content">
        {notifications.slice(0, 10).reverse().map((notification, index) => (
            <div id= {index % 2 === 0 ? 'odd' : 'even'} key={index}>
            <p id='time' key={index}>{notification.date} at {notification.time}</p>
            <p id='message' key={index}> {notification.message} </p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Notification