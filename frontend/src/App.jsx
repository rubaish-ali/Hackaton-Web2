import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScamShield from "./pages/ScamShield";
import Home from "./pages/Home";
import AIChat from "./pages/AIchat";
import Career from "./pages/career";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/career" element={<Career />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/scamshield" element={<ScamShield />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
