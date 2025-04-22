import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { Inventory, Add, Edit } from "@mui/icons-material";
import "../../styles/jungle-theme.css";

const InventoryManagement = () => {
  const { inventory } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredItems = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" className="admin-page">
      <Typography variant="h4" className="page-title">
        <Inventory className="title-icon" /> Inventory Management
      </Typography>

      <Box className="action-bar">
        <TextField
          label="Search Inventory"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          className="add-button"
          onClick={() => navigate("/admin/inventory/add")}
        >
          Add Item
        </Button>
      </Box>

      <Paper elevation={3} className="table-container">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell
                    className={
                      item.quantity <= 5 ? "low-stock" : ""
                    }
                  >
                    {item.quantity}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`status ${
                        item.quantity <= 0? "inactive" : "active"
                      }`}
                    >
                      {item.quantity <= item.threshold
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<Edit />}
                      size="small"
                      onClick={() =>
                        navigate(`/admin/inventory/edit/${item.id}`)
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default InventoryManagement;
