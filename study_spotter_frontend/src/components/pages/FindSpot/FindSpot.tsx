import "./FindSpot.css";
import { useEffect, useState } from "react";

function FindSpot() {
  const [occupied, setOccupied] = useState(false);

  useEffect(() => {
    const fetchSeat = () => {
      fetch("http://172.20.10.14:3000/seat") // <-- your server IP
        .then((res) => res.json())
        .then((data) => {
          setOccupied(data.seatOccupied);
        })
        .catch((err) => console.error("Fetch error:", err));
    };

    fetchSeat(); // fetch once at load

    const interval = setInterval(fetchSeat, 1000); // fetch every 1s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="TableParent">
      <div className="Table">
        <div
          className="Seat"
          style={{
            backgroundColor: occupied ? "red" : "lightgreen",
          }}
        ></div>
      </div>
    </div>
  );
}

export default FindSpot;
