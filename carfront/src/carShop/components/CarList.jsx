import React, { useEffect, useState } from "react";
import { SERVER_URL } from "./constants";

function CarList() {
  // car 목록을 서버로부터 가져와서 저장
  const [cars, setCars] = useState([]);

  // Application이 처음 시작할 때 목록을 한번만 요청하는 메소드
  // axios 와 같은 fetch라는 함수를 이용하여 서버에 요청
  // 유지보수를 위해 server url 은 외부 파일로 따로 관리
  useEffect(() => {
    fetch(SERVER_URL + "api/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <table>
        <tbody>
          {cars.map((car, index) => {
            return (
              <tr key={index}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td>{car.year}</td>
                <td>{car.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CarList;
