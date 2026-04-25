import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/globals.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page - Coming Soon</div>} />
        <Route path="/midi-player" element={<div>MIDI Player - Coming Soon</div>} />
        <Route path="/audio-player" element={<div>Audio Player - Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  )
}