import React, { useEffect, useState } from "react";
import { SERVER_URL } from "./constants";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function CarList() {
  // car 목록을 서버로부터 가져와서 저장
  const [cars, setCars] = useState([]);

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
    fetch(url, { method: "DELETE" })
      .then((response) => fetchCars())
      .catch((e) => console.log(e));
  };

  const columns = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (row) => {
        return (
          <IconButton onClick={() => onDelClick(row.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
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
    </div>
  );
}

export default CarList;
