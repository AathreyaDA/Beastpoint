import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Groups } from "@mui/icons-material";
import "../../styles/jungle-theme.css";

const EditStaff = () => {
  const { staffList, updateStaff } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {

    const staffMember = staffList.find((s) => s.id === id);
    if (staffMember) {
      setFormData({
        name: staffMember.name,
        level: staffMember.level, 
        role: staffMember.role,
      });
    } else {
      setError("Staff member not found");
    }
    
  }, [id, staffList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateStaff(id, formData);
      navigate("/admin/staff/manage");
    } catch (err) {
      setError("Failed to update staff member. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" className="admin-page">
      <Paper elevation={3} className="form-container">
        <Typography variant="h4" className="page-title">
          <Groups className="title-icon" /> Edit Staff Member
        </Typography>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <TextField
            label="Position"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            required
          />
          <TextField
            label="Level"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.level}
            onChange={(e) =>
              setFormData({ ...formData, level: e.target.value })
            }
            required
          />
          <Box className="form-actions">
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/staff/manage")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" className="submit-button">
              Update Staff
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditStaff;
