import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { HomePage, MidiPlayerPage, AudioPlayerPage } from './pages';
import './styles/globals.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/midi-player" element={<MidiPlayerPage />} />
          <Route path="/audio-player" element={<AudioPlayerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}