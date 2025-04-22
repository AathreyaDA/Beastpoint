import React from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PageWrapper from "../components/PageWrapper";

const StaffDashboard = () => (
  <PageWrapper>
    <div className="dashboard jungle-panel">
      <h1 className="dashboard-title">Staff Dashboard 🍃</h1>

      <div className="staff-card">
        <div className="staff-card-content">
          <h3>
            <BadgeIcon /> Staff: Rajeev Kumar
          </h3>
          <p>ID: STF1007</p>
          <p>Assigned Zones Today: Zone A, Zone B</p>
        </div>
      </div>

      <h3 className="health-alerts-title">🩺 Health Alerts:</h3>
      <ul className="health-alerts-list">
        <li>
          <LocalHospitalIcon />
          <span>Tiger in Zone A skipped morning meal</span>
        </li>
        <li>
          <CheckCircleIcon />
          <span>Macaw checked by vet today – all good</span>
        </li>
      </ul>
    </div>
  </PageWrapper>
);

export default StaffDashboard;
