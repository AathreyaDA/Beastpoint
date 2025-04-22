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
import { Inventory } from "@mui/icons-material";
import "../../styles/jungle-theme.css";

const EditInventoryItem = () => {
  const { id } = useParams();
  const { inventory, updateInventoryItem } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    id: "",
  });

  useEffect(() => {
    const item = inventory.find((item) => item.id === id);
    if (item) {
      setFormData({
        name: item.name,
        quantity: item.quantity,
        id: item.id,
      });
    }
  }, [id, inventory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInventoryItem({
      id: id,
      name: formData.name,
      quantity: Number(formData.quantity),
    });
    navigate("/admin/inventory");
  };

  return (
    <Container maxWidth="md" className="admin-page">
      <Paper elevation={3} className="form-container">
        <Typography variant="h4" className="form-title">
          <Inventory className="title-icon" /> Edit Inventory Item
        </Typography>

        <form onSubmit={handleSubmit}>
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
              Update Item
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditInventoryItem;
