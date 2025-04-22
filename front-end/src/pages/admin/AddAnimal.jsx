import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { Pets } from "@mui/icons-material";
import "../../styles/jungle-theme.css";

const AddAnimal = () => {
  const { addAnimal, admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    species: "",
    type: "",
    habitat: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnimal = addAnimal(formData);
    console.log("Animal added:", newAnimal);
    navigate("/admin/animals");
  };

  if (!admin || admin.role !== "ZooManager") {
    return (
      <Container maxWidth="md" className="admin-page">
        <Paper elevation={3} className="form-container">
          <Typography variant="h4" className="form-title">
            Unauthorized Access
          </Typography>
          <Typography variant="body1">
            You must be an admin to access this page.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="admin-page">
      <Paper elevation={3} className="form-container">
        <Typography variant="h4" className="form-title">
          <Pets className="title-icon" /> Add New Animal
        </Typography>

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
            label="Animal Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <TextField
            label="Species"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.species}
            onChange={(e) =>
              setFormData({ ...formData, species: e.target.value })
            }
            required
          />

          <Box className="form-row">
          <TextField
            select
            label="Type"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            required
          >
            <MenuItem value="mammal">Mammal</MenuItem>
            <MenuItem value="bird">Bird</MenuItem>
            <MenuItem value="reptile">Reptile</MenuItem>
          </TextField>


            <FormControl fullWidth margin="normal" required>
              <InputLabel>Habitat</InputLabel>
              <Select
                value={formData.habitat}
                label="Habitat"
                onChange={(e) =>
                  setFormData({ ...formData, habitat: e.target.value })
                }
              >
                <MenuItem value="Savanna">Savanna</MenuItem>
                <MenuItem value="Jungle">Jungle</MenuItem>
                <MenuItem value="Aquatic">Aquatic</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className="form-actions">
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/animals")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-button"
            >
              Add Animal
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddAnimal;
