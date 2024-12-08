import React, { useState } from 'react'
import '../style.css'

function Card({img, name, status, id}) {

  const [display_status, setStatus] = useState(status)

  function nextButton(status) {
      if (status === "ON") {
      return  <button id="switch" onClick={changeState}>TURN OFF</button>;
    }
    return <button id="switch" onClick={changeState}>TURN ON</button>;
  }

  function changeState(){
    if(display_status == "ON"){
      setStatus("OFF")
    }
    else{
      setStatus("ON")
    }
  }

  return (
    <div id='card_container'>
        <img src={img} id='image' />
        <h5 id="name">{name}</h5>
        <h3 id="status">{display_status}</h3>

       {nextButton(display_status)}
    </div>
  )
}

export default Card
