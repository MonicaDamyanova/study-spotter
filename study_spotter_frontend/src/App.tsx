import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import FindSpot from "./components/pages/FindSpot/FindSpot";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MaintenanceRequest from "./components/pages/MaintenanceRequest/MaintenanceRequest";
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
            <Route
              path="/MaintenanceRequest"
              element={<MaintenanceRequest />}
            />
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
