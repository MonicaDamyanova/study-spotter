// MaintenanceRequest.tsx
import { useState } from "react";
import "./MaintenanceRequest.css";

function MaintenanceRequest() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");

  function handleSubmit() {
    alert("Thank You, Your Request Has Been Sent!");

    // clear all fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setLocation("");
    setIssue("");
  }

  return (
    <div className="MaintenanceRequest">
      <h1>Maintenance Request</h1>

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location of Issue"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <textarea
        placeholder="Describe the issue..."
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit Request</button>
    </div>
  );
}

export default MaintenanceRequest;
