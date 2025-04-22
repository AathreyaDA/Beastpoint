import { useState, useContext, useEffect } from "react";
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
import { Groups, Add, Edit, Delete } from "@mui/icons-material";
import "../../styles/jungle-theme.css";

const ManageStaff = () => {
  const { staffList, addStaff, deleteStaff } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  // useEffect(()=>{
  //   const fetchAllStaff = async() => {
  //     const reponse = await fetch('http://localhost:8080/staff/all');
  //     const responseObj = await response.json();
  //   }
  // }, [])
  const filteredStaff = staffList.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = (e) => {
    e.preventDefault();
    addStaff(newStaff);
    setNewStaff({ name: "", role: "", level: 0 });
    setShowAddForm(false);
  };

  const handleDeleteStaff = (staffToDelete) => {
    deleteStaff(staffToDelete);
  };

  return (
    <Container maxWidth="lg" className="admin-page">
      <Typography variant="h4" className="page-title">
        <Groups className="title-icon" /> Staff Management
      </Typography>

      <Box className="action-bar">
        <TextField
          label="Search Staff"
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
          onClick={() => setShowAddForm(true)}
        >
          Add Staff
        </Button>
      </Box>

      {showAddForm && (
        <Paper
          elevation={3}
          className="form-container"
          style={{ marginBottom: "2rem", padding: "1.5rem" }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Staff Member
          </Typography>
          <form onSubmit={handleAddStaff}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newStaff.name}
              onChange={(e) =>
                setNewStaff({ ...newStaff, name: e.target.value })
              }
              required
            />
            <TextField
              label="Position"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newStaff.role}
              onChange={(e) =>
                setNewStaff({ ...newStaff, role: e.target.value })
              }
              required
            />
            <TextField
              type="number"
              label="Level"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newStaff.level}
              onChange={(e) =>
                setNewStaff({ ...newStaff, level: parseInt(e.target.value) })
              }
            />
            <Box className="form-actions">
              <Button variant="outlined" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit-button"
              >
                Add Staff
              </Button>
            </Box>
          </form>
        </Paper>
      )}

      <Paper elevation={3} className="table-container">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.level}</TableCell>
                  <TableCell>
                    <Button startIcon={<Edit />} size="small">
                      Edit
                    </Button>
                    <Button startIcon={<Delete />} size="small" color="error" onClick={()=>handleDeleteStaff(member)}>
                      Delete
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

export default ManageStaff;
