import React from 'react'

function Notification({notifications}) {
  return (
    <div id="notification_container">
        <div id="title">Notification</div>
        <div id="notification_content">
        {notifications.map((notification, index) => (
            <p key={index}>{notification}</p> // Hiển thị các thông báo
        ))}
        </div>
    </div>
  )
}

export default Notification