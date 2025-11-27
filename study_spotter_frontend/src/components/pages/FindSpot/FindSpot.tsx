// FindSpot.tsx
import "./FindSpot.css";
import { useEffect, useState } from "react";

function FindSpot() {
  // State that tracks whether the sensor seat is occupied.
  // This value is updated every second from the backend.
  const [occupied, setOccupied] = useState(false);

  // On mount, start polling the backend for the current seat status.
  // The Arduino posts data to the server; this endpoint exposes whether
  // the monitored seat is currently occupied.
  useEffect(() => {
    const fetchSeat = () => {
      fetch("http://localhost:3000/seat")
        .then((res) => res.json())
        .then((data) => {
          // Backend returns { seatOccupied: boolean }
          setOccupied(data.seatOccupied);
        })
        .catch((err) => console.error("Fetch error:", err));
    };

    // Initial fetch when the component first loads
    fetchSeat();

    // Poll every 1 second to keep the UI live-updated
    const interval = setInterval(fetchSeat, 1000);

    // Cleanup: stop polling when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="FindSpotPage">
      {/* Header and explanation for the user */}
      <div className="FindSpotInfo">
        <h1>Find a Spot in Stauffer</h1>
        <p>
          This map shows several seats, including one with a sensor that detects
          occupancy. The colored dot indicates whether that seat is currently
          available or occupied. Use this information to help you find a study
          spot!
        </p>

        {/* Legend explaining what each color means */}
        <div className="Legend">
          <div className="LegendItem">
            <span className="LegendDot available"></span> Available
          </div>
          <div className="LegendItem">
            <span className="LegendDot occupied"></span> Occupied
          </div>
          <div className="LegendItem">
            <span className="LegendDot inactive"></span> Not Monitored
          </div>
        </div>
      </div>

      {/* Library-style layout with multiple tables */}
      <div className="LibraryLayout">
        {/* Row 1: decorative (non‑monitored) tables on the left side */}
        <div className="TableRow row1">
          <div className="Table SmallTable">
            <div className="SeatInactive top-left" />
            <div className="SeatInactive top-right" />
            <div className="SeatInactive bottom-left" />
            <div className="SeatInactive bottom-right" />
          </div>

          <div className="Table SmallTable">
            <div className="SeatInactive top-left" />
            <div className="SeatInactive top-right" />
            <div className="SeatInactive bottom-left" />
            <div className="SeatInactive bottom-right" />
          </div>
        </div>

        {/* Main table: this is the one linked to the Arduino sensor */}
        <div className="TableRow row2">
          <div className="Table MainTable">
            {/* Monitored seat.
                IMPORTANT: the position/size of this element is calibrated
                to match the physical sensor and should not be changed
                in CSS or layout. Only the color/visual styling is dynamic. */}
            <div
              className="Seat"
              style={{
                // Green when free, red when occupied
                backgroundColor: occupied ? "#d9534f" : "#5cb85c",
                // Glow effect to make the live sensor seat stand out
                boxShadow: occupied
                  ? "0 0 12px rgba(217, 83, 79, 0.8)"
                  : "0 0 10px rgba(92, 184, 92, 0.7)",
              }}
            />

            {/* Other seats around the same table.
                These are visual only (not wired to sensors). */}
            <div className="Seat2" />
            <div className="Seat3" />
            <div className="Seat4" />
            <div className="Seat5" />
            <div className="Seat6" />
            <div className="Seat7" />
            <div className="Seat8" />
          </div>
        </div>

        {/* Row 3: more decorative tables on the right side */}
        <div className="TableRow row3">
          <div className="Table SmallTable">
            <div className="SeatInactive left" />
            <div className="SeatInactive right" />
          </div>

          <div className="Table SmallTable">
            <div className="SeatInactive left" />
            <div className="SeatInactive right" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindSpot;
