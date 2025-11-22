import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import FindSpot from "./components/pages/FindSpot/FindSpot";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Feedback from "./components/pages/Feedback/Feedback";
import SignInPage from "./components/pages/SignInPage/SignInPage";
import { useState } from "react";
import Dashboard from "./components/pages/Dashboard/Dashboard";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div className="PageWrapper">
      <Router>
        <Header signedIn={signedIn} setSignedIn={setSignedIn} />

        <div className="MainContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/FindSpot" element={<FindSpot />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route
              path="/SignInPage"
              element={<SignInPage setSignedIn={setSignedIn} />}
            />
            {signedIn && <Route path="/dashboard" element={<Dashboard />} />}
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
