import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';
import Statistics from "./pages/Statistics";
import 'leaflet/dist/leaflet.css';

 
function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/statistics" element={<Statistics/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
