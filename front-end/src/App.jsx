import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Memory from "./pages/memory";
import NewMemory from "./pages/new-memory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/new-memory" element={<NewMemory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
