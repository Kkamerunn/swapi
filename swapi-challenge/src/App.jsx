import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Vehicles from "./pages/Vehicles";
import Starships from "./pages/Starships";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Vehicles />} />
            <Route path="starships" element={<Starships />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
