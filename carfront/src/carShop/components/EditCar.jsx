import React, { useState } from "react";
import {
  Button,
  TextField,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const EditCar = ({ data, updateCar }) => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState(data.row);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) =>
    setCar({ ...car, [e.target.name]: e.target.value });
  const handleSave = () => {
    updateCar(car, data.id);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} aria-label="add">
        <EditIcon color="primary" />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              variant="standard"
              label="Brand"
              name="brand"
              value={car.brand}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Model"
              name="model"
              value={car.model}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Color"
              name="color"
              value={car.color}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Year"
              name="year"
              value={car.year}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Price"
              name="price"
              value={car.price}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCar;
