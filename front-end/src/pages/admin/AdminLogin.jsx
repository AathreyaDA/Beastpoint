import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import "../../styles/jungle-theme.css";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const admins = [
    {
      id: "giga",
      password: "pes1",
      name: "Ajith S P",
      role: "Head Admin",
    },
    {
      id: "batman",
      password: "pes2",
      name: "Aathreya D A",
      role: "Inventory Manager",
    },
    {
      id: "ronaldo",
      password: "pes3",
      name: "Akarsh T O",
      role: "Animal Care",
    },
    {
      id: "reddy",
      password: "pes4",
      name: "Abhishek S",
      role: "Visitor Services",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim and normalize inputs
    const trimmedUsername = credentials.id.trim().toLowerCase();
    const trimmedPassword = credentials.password.trim();

    const response = await fetch(`http://localhost:8080/login/${credentials.id}/${credentials.password}`);
    const responseObj = await response.json();

    const admin = responseObj;
    // const admin = admins.find(
    //   (a) =>
    //     a.id.toLowerCase() === trimmedUsername &&
    //     a.password === trimmedPassword
    // );

    if (admin) {
      console.log("Login successful for:", admin.name);
      login(admin);
      navigate("/admin/dashboard");
    } else {
      console.log("Login failed - invalid credentials");
      setError("Invalid credentials. Please try: giga/pes1, batman/pes2, etc.");
    }
  };

  return (
    <Container maxWidth="xs" className="admin-login-container">
      <Paper elevation={3} className="login-paper">
        <Typography variant="h4" gutterBottom className="login-title">
          Admin Portal
        </Typography>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={credentials.id}
            onChange={(e) =>
              setCredentials({ ...credentials, id: e.target.value })
            }
            className="admin-input"
            autoComplete="id"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="admin-input"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="jungle-button"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
