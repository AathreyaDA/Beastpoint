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

const StaffRegister = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");
  const { registerStaff } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.cpassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await registerStaff({id: formData.id, password: formData.password});
      navigate("/staff/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Paper elevation={3} className="login-paper">
        <Typography variant="h4" gutterBottom className="login-title">
          Staff Registration
        </Typography>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.cpassword}
            onChange={(e) =>
              setFormData({ ...formData, cpassword: e.target.value })
            }
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="jungle-button"
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link href="/staff/login" className="link">
            Login here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default StaffRegister;
