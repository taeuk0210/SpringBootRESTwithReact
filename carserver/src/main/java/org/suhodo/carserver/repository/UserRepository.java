package org.suhodo.carserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.suhodo.carserver.domain.User;

import java.util.Optional;

/*
* 아무런 설정이 없으면 /api/users로 REST Controller에 접근할 수 있는데
* 해당 annotation을 이용하여 REST Controller 역할을 할 수 없게 막아야 함.
* */
@RepositoryRestResource(exported = false)
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
