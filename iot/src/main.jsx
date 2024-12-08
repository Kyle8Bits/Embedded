import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Devices from './Devices'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Devices/>
  </StrictMode>,
)
