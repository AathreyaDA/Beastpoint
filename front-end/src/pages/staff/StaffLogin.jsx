import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import "../../styles/jungle-theme.css";

const StaffLogin = () => {
  const [credentials, setCredentials] = useState({
    id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { loginStaff } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginStaff(credentials);
      navigate("/staff/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Paper elevation={3} className="login-paper">
        <Typography variant="h4" gutterBottom className="login-title">
          Staff Login
        </Typography>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={credentials.id}
            onChange={(e) =>
              setCredentials({ ...credentials, id: e.target.value })
            }
            required
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
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="jungle-button"
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: "1rem" }}>
          Don't have an account?{" "}
          <Link href="/staff/register" className="link">
            Register here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default StaffLogin;
