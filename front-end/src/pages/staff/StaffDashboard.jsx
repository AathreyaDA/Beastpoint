import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Pets,
  Groups,
  LocalHospital,
  CalendarToday,
  ExitToApp,
} from "@mui/icons-material";
import "../../styles/jungle-theme.css";

const StaffDashboard = () => {
  const { staff, logoutStaff } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!staff) {
    navigate("/staff/login");
    return null;
  }

  const tasks = [
    { icon: <Pets />, text: "Feed animals in Zone A", time: "9:00 AM" },
    {
      icon: <LocalHospital />,
      text: "Health check for lions",
      time: "11:00 AM",
    },
    { icon: <Groups />, text: "Visitor tour", time: "2:00 PM" },
  ];

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Paper elevation={3} className="dashboard-header">
        <div className="profile-section">
          <Avatar className="profile-avatar">{staff.name.charAt(0)}</Avatar>
          <div className="profile-info">
            <Typography variant="h5">{staff.name}</Typography>
            <Typography variant="subtitle1">
              {staff.position} - {staff.department}
            </Typography>
          </div>
        </div>
        <Button
          variant="outlined"
          startIcon={<ExitToApp />}
          onClick={() => {
            logoutStaff();
            navigate("/staff/login");
          }}
        >
          Logout
        </Button>
      </Paper>

      <Grid container spacing={3} className="dashboard-content">
        <Grid item xs={12} md={8}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Tasks
              </Typography>
              <List>
                {tasks.map((task, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{task.icon}</ListItemIcon>
                    <ListItemText primary={task.text} secondary={task.time} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Button
                variant="contained"
                fullWidth
                className="action-button"
                startIcon={<Pets />}
                onClick={() => navigate("/staff/animals")}
              >
                Animal Care
              </Button>
              <Button
                variant="contained"
                fullWidth
                className="action-button"
                startIcon={<LocalHospital />}
                onClick={() => navigate("/staff/health-checks")}
              >
                Health Checks
              </Button>
              <Button
                variant="contained"
                fullWidth
                className="action-button"
                startIcon={<CalendarToday />}
                onClick={() => navigate("/staff/schedule")}
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StaffDashboard;
