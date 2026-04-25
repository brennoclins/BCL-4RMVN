import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, MidiPlayerPage, AudioPlayerPage } from '@/pages';
import './styles/globals.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/midi-player" element={<MidiPlayerPage />} />
        <Route path="/audio-player" element={<AudioPlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
