package org.suhodo.carserver.repository;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.suhodo.carserver.domain.Car;
import org.suhodo.carserver.domain.Owner;

import java.util.Arrays;

@SpringBootTest
@Log4j2
public class OwnerRepositoryTests {
    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private CarRepository carRepository;

    @Test
    public void testInsertOwner() {
        Owner owner1 = Owner.builder()
                .lastName("강")
                .firstName("태욱")
                .build();
        Owner owner2 = Owner.builder()
                .lastName("이")
                .firstName("주현")
                .build();
        ownerRepository.saveAll(Arrays.asList(owner1, owner2));

        Car car1 = Car.builder()
                .brand("Ford")
                .model("Mustang")
                .color("white")
                .registerNumber("AAA-111")
                .year(2024)
                .price(6400)
                .owner(owner1)
                .build();
        Car car2 = Car.builder()
                .brand("Hyndai")
                .model("Genesis")
                .color("black")
                .registerNumber("HHHH-111")
                .year(2024)
                .price(8500)
                .owner(owner2)
                .build();
        Car car3 = Car.builder()
                .brand("KIA")
                .model("Sorento")
                .color("gray")
                .registerNumber("KKK-111")
                .year(2024)
                .price(4300)
                .owner(owner1)
                .build();
        Car car4 = Car.builder()
                .brand("Hyndai")
                .model("Granzer")
                .color("black")
                .registerNumber("HHHH-222")
                .year(2024)
                .price(7500)
                .owner(owner2)
                .build();
        Car car5 = Car.builder()
                .brand("KIA")
                .model("Newcarense")
                .color("blue")
                .registerNumber("KKK-222")
                .year(2024)
                .price(6300)
                .owner(owner1)
                .build();

        carRepository.saveAll(Arrays.asList(car1, car2, car3, car4, car5));
        /*
         * carRepository.save(car1);carRepository.save(car2);carRepository.save(car3); 와 동일
         * */
    }

}
