import './Header.css'
import logo from '../../assets/queens_logo.png'
import { Link } from 'react-router-dom'
import React, { useState } from "react";

function Header(){
    const [isOpen, setIsOpen] = useState(false)

    return(
        <header className = "Header">
            <Link to = "/">
                <img
                className = "QueensLogo"
                src = {logo}
                alt = "Queen's Emblum"
                />
            
            </Link>
            

            <nav className = "NavElements">
                <Link to="/" className = "Home">Home</Link>
                <Link to="/FindSpot" className = "About">Find A Spot In Stauffer</Link>
            <div
             className = "Dropdown"
             onClick={() => setIsOpen(!isOpen)}
             
                >
                <button className = "BookRoomButton">
                    Book a Study Room▾
                </button>
                
                {isOpen && (
                    <div className = "DropdownContent">
                        <a href = 'https://smithengineering.queensu.ca/current-students/book-ilc-room.html' target='blank'>
                            Book A Room In Beamish Munro 
                        </a>

                        <a href = 'https://booking.library.queensu.ca/reserve/stauffer-rooms' target='blank'>
                            Book A Room In Stauffer Library
                        </a>

                        <a href = 'https://booking.library.queensu.ca/reserve/douglas-rooms' target='blank'>
                            Book A Room In Douglas Library
                        </a>
                        </div>
                )}
            </div>

            <Link to = "/Feedback" className= "Feedback">
                Maintenance Request
            </Link>
           
            
            </nav>

            <button className = "SignInButton">
                <Link to = "/SignInPage" className = "SignInWord">
                    Sign In
                </Link>
            </button>



        </header>



    )
       
        









            
          
    

        
    
}
export default Header