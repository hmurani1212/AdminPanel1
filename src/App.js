import './App.css';
import Dashbord from './Components/Dashbord';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Position from './Components/Position';
import Tops from './Components/Tops';
import { ApiDataProvider } from './Components/ApiCall';
import ManageContrector from './Components/ManageContrector';
import Staff from "./Components/Staff";
import Shift from './Components/Shitf';
import Client from './Components/Clients';
import Repoert from './Components/Repoert';
import Login from './Components/Login';
import Site from './Components/Site';
function App() {
  const login = localStorage.getItem("email");
  return (
    <>
      <BrowserRouter>
        <ApiDataProvider>
          <Routes>
            {
              login ? <Route path="/" element={<Navbar />}>
                <Route index element={<Dashbord />} />
                <Route path="Position" element={<Position />} />
                <Route path="Tops" element={<Tops />} />
                <Route path="ManageContrector" element={<ManageContrector />} />
                <Route path="Staff" element={<Staff />} />
                <Route path="Client" element={<Client />} />
                <Route path="Shift" element={<Shift />} />
                <Route path="Repoert" element={<Repoert />} />
                <Route path="Site" element={<Site />} />
              </Route> :
                   <Route path="/" element={<Login />} />
            }

          </Routes>
        </ApiDataProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
