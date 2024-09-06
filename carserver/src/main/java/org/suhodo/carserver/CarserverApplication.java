package org.suhodo.carserver;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.suhodo.carserver.domain.Car;
import org.suhodo.carserver.domain.Owner;
import org.suhodo.carserver.repository.CarRepository;
import org.suhodo.carserver.repository.OwnerRepository;

import javax.swing.tree.RowMapper;
import java.util.Arrays;

@Log4j2
@EnableJpaAuditing
@SpringBootApplication
@RequiredArgsConstructor
public class CarserverApplication implements CommandLineRunner {

    private final CarRepository carRepository;
    private final OwnerRepository ownerRepository;

    public static void main(String[] args) {

        SpringApplication.run(CarserverApplication.class, args);
        log.info("CarServer Application is started. . . . . . . . . . . . .");
    }
    /*
    * application 실행 시 자동으로 호출됨
    * */
    @Override
    public void run(String... args) throws Exception {

    }

}
