package org.suhodo.carserver.repository;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.suhodo.carserver.domain.User;

import java.util.Arrays;

@SpringBootTest
@Log4j2
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testUserInsert() {
        BCryptPasswordEncoder cryptor = new BCryptPasswordEncoder();
        User user = User.builder()
                .username("user")
                .password(cryptor.encode("user"))
                .role("USER")
                .build();
        User admin = User.builder()
                .username("admin")
                .password(cryptor.encode("admin"))
                .role("USER")
                .build();
        userRepository.saveAll(Arrays.asList(user, admin));


    }
}
