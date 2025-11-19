import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import FindSpot from './components/pages/FindSpot/FindSpot';
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Feedback from './components/pages/Feedback/Feedback';




function App(){
  return (
    <div className = "PageWrapper">
      <Router>
        <Header />

      <div className = "MainContent">
        <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/FindSpot" element = {<FindSpot/>} />
        <Route path = "/Feedback" element = {<Feedback/>}/>
        </Routes>


      </div>
      
      <Footer/>
    </Router>
    </div>
    
    

    
  );
}

export default App