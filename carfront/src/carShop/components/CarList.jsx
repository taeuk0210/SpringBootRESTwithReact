import React, { useEffect, useState } from "react";
import { SERVER_URL } from "./constants";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonGroup, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function CarList() {
  // car 목록을 서버로부터 가져와서 저장
  const [cars, setCars] = useState([]);

  // snackbar
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // Application이 처음 시작할 때 목록을 한번만 요청하는 메소드
  // axios 와 같은 fetch라는 함수를 이용하여 서버에 요청
  // 유지보수를 위해 server url 은 외부 파일로 따로 관리
  const fetchCars = () => {
    fetch(SERVER_URL + "api/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // 삭제후 목록 재 요청
  const onDelClick = (url) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCars();
            setOpenDelete(true);
          } else {
            alert("Something went wrong");
          }
        })
        .catch((e) => console.error(e));
    }
  };

  // 추가후 목록 재 요청
  const addCar = (car) => {
    fetch(SERVER_URL + "api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (response.ok) {
          fetchCars();
          setOpenAdd(true);
        } else alert("Something went wrong");
      })
      .catch((e) => console.error(e));
  };

  // 서중 후 목록 재 요청
  const editCar = (car, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (response.ok) {
          fetchCars();
          setOpenEdit(true);
        } else alert("Something went wrong");
      })
      .catch((e) => console.error(e));
  };
  const columns = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "_links.self.href",
      headerName: <AddCar addCar={addCar} />,
      sortable: false,
      filterable: false,
      renderCell: (row) => {
        return (
          <ButtonGroup>
            <EditCar data={row} updateCar={editCar} />
            <IconButton onClick={() => onDelClick(row.id)} aria-label="delete">
              <DeleteIcon sx={{ color: "#CC0000" }} />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <div style={{ height: 500, width: "calc(100%-20px)", margin: "20px" }}>
      <DataGrid
        rows={cars}
        columns={columns}
        getRowId={(row) => row._links.self.href}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openDelete}
        autoHideDuration={2000}
        onClose={() => setOpenDelete(false)}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Deleting car was successful.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAdd}
        autoHideDuration={2000}
        onClose={() => setOpenAdd(false)}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Adding car was successful.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openEdit}
        autoHideDuration={2000}
        onClose={() => setOpenEdit(false)}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Editing car was successful.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CarList;
