import { useContext } from "react";
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
  Box,
} from "@mui/material";
import { Pets, Add } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/jungle-theme.css";

const Animals = () => {
  const { animals, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" className="admin-page">
      <Typography variant="h4" className="page-title">
        <Pets className="title-icon" /> Animal Management
      </Typography>

      {user?.role === "ZooManager" && (
        <Box className="action-bar">
          <Button
            variant="contained"
            startIcon={<Add />}
            className="add-button"
            onClick={() => navigate("/admin/animals/add")}
          >
            Add Animal
          </Button>
        </Box>
      )}

      <Paper elevation={3} className="table-container">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Species</TableCell>
                <TableCell>Habitat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell>{animal.id}</TableCell>
                  <TableCell>{animal.name}</TableCell>
                  <TableCell>{animal.species}</TableCell>
                  <TableCell>{animal.habitat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Animals;
