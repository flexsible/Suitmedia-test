import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Placeholder routes for menu testing */}
        <Route path="/work" element={<Landing />} />
        <Route path="/about" element={<Landing />} />
        <Route path="/services" element={<Landing />} />
        <Route path="/careers" element={<Landing />} />
        <Route path="/contact" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
