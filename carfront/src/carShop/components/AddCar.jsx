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
import AddBoxIcon from "@mui/icons-material/AddBox";

const AddCar = (props) => {
  const { addCar } = props;
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    price: "",
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) =>
    setCar({ ...car, [e.target.name]: e.target.value });
  const handleSave = () => {
    addCar(car);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} aria-label="add">
        <AddBoxIcon color="primary" />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCar;
