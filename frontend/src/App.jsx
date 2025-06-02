import NavBar from './components/NavBar';
import {BrowserRouter, Routes, Route} from "react-router";
import Home from './pages/Home';
import Statistics from "./pages/Statistics";
import 'leaflet/dist/leaflet.css';
import {RealTimeProvider} from "./context/RealTimeDataContext.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>

        <RealTimeProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/statistics" element={<Statistics/>}/>
          </Routes>
        </RealTimeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
