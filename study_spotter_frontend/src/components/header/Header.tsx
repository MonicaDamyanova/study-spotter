import "./Header.css";
import logo from "../../assets/queens_logo.png";
import { Link, Navigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  signedIn: boolean;
  setSignedIn: (val: boolean) => void;
}

function Header({ signedIn, setSignedIn }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="Header">
      <Link to="/">
        <img className="QueensLogo" src={logo} alt="Queen's Emblum" />
      </Link>

      <nav className="NavElements">
        <Link to="/" className="Home">
          Home
        </Link>
        <Link to="/FindSpot" className="About">
          Find A Spot In Stauffer
        </Link>
        <div className="Dropdown" ref={dropdownRef}>
          <button className="BookRoomButton" onClick={() => setIsOpen(!isOpen)}>
            Book a Study Room▾
          </button>

          {isOpen && (
            <div className="DropdownContent">
              <a
                href="https://smithengineering.queensu.ca/current-students/book-ilc-room.html"
                target="blank"
              >
                Book A Room In Beamish Munro
              </a>

              <a
                href="https://booking.library.queensu.ca/reserve/stauffer-rooms"
                target="blank"
              >
                Book A Room In Stauffer Library
              </a>

              <a
                href="https://booking.library.queensu.ca/reserve/douglas-rooms"
                target="blank"
              >
                Book A Room In Douglas Library
              </a>
            </div>
          )}
        </div>

        <Link to="/Feedback" className="Feedback">
          Maintenance Request
        </Link>

        {signedIn && (
          <Link to="/dashboard" className="Dashboard">
            Dashboard
          </Link>
        )}

        {signedIn ? (
          <button
            className="SignOutButton"
            onClick={() => {
              setSignedIn(false);
              navigate("/");
            }}
          >
            Sign Out
          </button>
        ) : (
          <button className="SignInButton">
            <Link to="/SignInPage" className="SignInWord">
              Sign In
            </Link>
          </button>
        )}
      </nav>
    </header>
  );
}
export default Header;
