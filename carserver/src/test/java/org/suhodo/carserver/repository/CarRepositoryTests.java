package org.suhodo.carserver.repository;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.suhodo.carserver.domain.Car;

import java.util.List;
import java.util.stream.IntStream;

@Log4j2
@SpringBootTest
public class CarRepositoryTests {

    @Autowired
    private CarRepository carRepository;

    @Test
    public void testFindAllCars() {
        List<Car> cars = carRepository.findAll();
        cars.forEach(log::info);
    }

    @Test
    public void testFindCarByBrandAndColor() {
        for (Car car : carRepository.findByBrand("Ford")){
            log.info(car);
        }
        for (Car car : carRepository.findByColor("white")){
            log.info(car);
        }
    }
}
