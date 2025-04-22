import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Inventory } from "@mui/icons-material";
import "../../styles/jungle-theme.css";

const AddInventoryItem = () => {
  const { addInventoryItem } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = addInventoryItem({
      ...formData,
      quantity: Number(formData.quantity),
      id: (formData.id),
    });
    console.log("Inventory item added:", newItem);
    navigate("/admin/inventory");
  };

  return (
    <Container maxWidth="md" className="admin-page">
      <Paper elevation={3} className="form-container">
        <Typography variant="h4" className="form-title">
          <Inventory className="title-icon" /> Add Inventory Item
        </Typography>

        <form onSubmit={handleSubmit}>
        <TextField
              label="Item ID"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, id: e.target.value })
              }
              required
            />

          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Box className="form-row">
            <TextField
              label="Quantity"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            />

            
          </Box>

          <Box className="form-actions">
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/inventory")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-button"
            >
              Add Item
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddInventoryItem;
