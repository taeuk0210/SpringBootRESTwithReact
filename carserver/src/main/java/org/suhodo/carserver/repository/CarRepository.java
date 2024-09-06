package org.suhodo.carserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.suhodo.carserver.domain.Car;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findByBrand(String brand);
    List<Car> findByColor(String color);
}
