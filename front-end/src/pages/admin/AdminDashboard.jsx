import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  LinearProgress,
  Container,
  Box,
} from "@mui/material";
import {
  Pets,
  Groups,
  Map,
  Inventory,
  ExitToApp,
  Notifications,
  Settings,
  Menu,
} from "@mui/icons-material";
import "../../styles/jungle-theme.css";

const AdminDashboard = () => {
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const stats = [
    {
      title: "Animals",
      value: 45,
      icon: <Pets />,
      progress: 75,
      path: "/admin/animals",
    },
    {
      title: "Staff",
      value: 12,
      icon: <Groups />,
      progress: 45,
      path: "/admin/staff",
    },
    {
      title: "Zones",
      value: 7,
      icon: <Map />,
      progress: 60,
      path: "/admin/zones",
    },
    {
      title: "Inventory",
      value: 156,
      icon: <Inventory />,
      progress: 85,
      path: "/admin/inventory",
    },
  ];

  const quickActions = [
    { title: "Add Animal", icon: <Pets />, path: "/admin/animals/add" },
    { title: "Manage Staff", icon: <Groups />, path: "/admin/staff/manage" },
  ];

  if (!admin) return null;

  return (
    <div className="modern-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <Box className="header-left">
          {/* <Button className="menu-button">
            <Menu />
          </Button> */}
        </Box>
        <Box className="header-right">
          <Button className="notification-button">
            <Notifications />
          </Button>
          <Box className="user-profile">
            <Avatar className="user-avatar">{admin.name.charAt(0)}</Avatar>
            <Box className="user-info">
              <Typography variant="subtitle2">{admin.name}</Typography>
              <Typography variant="caption">{admin.role}</Typography>
            </Box>
          </Box>
          <Button
            className="logout-button"
            onClick={logout}
            startIcon={<ExitToApp />}
          >
            Logout
          </Button>
        </Box>
      </header>

      {/* Main Content */}
      <Container maxWidth="xl" className="dashboard-content">
        {/* Welcome Banner */}
        <Card className="welcome-banner">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Welcome back, <strong>{admin.name}</strong>!
            </Typography>
            <Typography variant="body2">
              You have 5 new notifications and 3 pending tasks.
            </Typography>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <Grid container spacing={3} className="stats-grid">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="stat-card" onClick={() => navigate(stat.path)}>
                <CardContent>
                  <Box className="stat-icon">{stat.icon}</Box>
                  <Typography variant="h6" className="stat-title">
                    {stat.title}
                  </Typography>
                  <Typography variant="h3" className="stat-value">
                    {stat.value}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={stat.progress}
                    className="stat-progress"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Typography variant="h6" className="section-title">
          Quick Actions
        </Typography>
        <Grid container spacing={2} className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                fullWidth
                className="quick-action-button"
                onClick={() => navigate(action.path)}
                startIcon={action.icon}
              >
                {action.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
