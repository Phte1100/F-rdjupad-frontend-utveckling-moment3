import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import MenuListLoggedIn from "./components/MenuListLoggedIn";
import EditMenuItem from "./components/EditMenuItem"; // 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuListLoggedIn />} />
        <Route path="/menu/edit/:id" element={<EditMenuItem />} /> 
      </Routes>
    </Router>
  );
}

export default App;
