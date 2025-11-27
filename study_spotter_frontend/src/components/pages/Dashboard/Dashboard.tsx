import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState<
    "feedback" | "maintenance"
  >("feedback");

  return (
    <div className="DashboardHome">
      <h1>Welcome to your Dashboard</h1>
      <p>This is where you can manage your study spots and preferences.</p>

      {/* Section selector */}
      <div className="DashboardTabs">
        <button
          className={
            activeSection === "feedback"
              ? "DashboardTab active"
              : "DashboardTab"
          }
          onClick={() => setActiveSection("feedback")}
        >
          Feedback
        </button>
        <button
          className={
            activeSection === "maintenance"
              ? "DashboardTab active"
              : "DashboardTab"
          }
          onClick={() => setActiveSection("maintenance")}
        >
          Maintenance Requests
        </button>
      </div>

      {/* Content area: only one section visible at a time */}
      <div className="DashboardContent">
        {activeSection === "feedback" && (
          <section className="DashboardCard">
            <h2>Feedback</h2>
            <p>View and track feedback submitted by users.</p>
            <ul>
              <li>Feedback #1 – “Chairs on 3rd floor are wobbly.”</li>
              <li>Feedback #2 – “Lighting is too dim near window seats.”</li>
              <li>Feedback #3 – “Noise levels near printers are too high.”</li>
            </ul>
          </section>
        )}

        {activeSection === "maintenance" && (
          <section className="DashboardCard">
            <h2>Maintenance Requests</h2>
            <p>See recent maintenance requests and their status.</p>
            <ul>
              <li>
                Request #101 – Broken outlet – <strong>In Progress</strong>
              </li>
              <li>
                Request #102 – Flickering light – <strong>Submitted</strong>
              </li>
              <li>
                Request #103 – Broken chair – <strong>Resolved</strong>
              </li>
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
