import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ButtonGroup, Snackbar, Button, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import { SERVER_URL } from "./constants";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function CarList({ notAuth }) {
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
    fetch(SERVER_URL + "api/cars", {
      headers: { "Authorization": sessionStorage.getItem("jwt") },
    })
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
      fetch(url, {
        method: "DELETE",
        headers: { "Authorization": sessionStorage.getItem("jwt") },
      })
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
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem("jwt"),
      },
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
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem("jwt"),
      },
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

  // logout
  const logout = () => {
    sessionStorage.removeItem("jwt");
    notAuth();
  };

  const columns = [
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "color", headerName: "Color", width: 100 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "_links.self.href",
      headerName: <AddCar addCar={addCar} />,
      sortable: false,
      filterable: false,
      renderCell: (row) => {
        return (
          <ButtonGroup>
            <EditCar data={row} editCar={editCar} />
            <IconButton onClick={() => onDelClick(row.id)} aria-label="delete">
              <DeleteIcon color="error" />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <div
      style={{
        height: 500,
        width: 750,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "20px",
      }}
    >
      <Stack direction="row" spacing={10} mt={1}>
        <Button onClick={logout}>Logout</Button>
      </Stack>
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
