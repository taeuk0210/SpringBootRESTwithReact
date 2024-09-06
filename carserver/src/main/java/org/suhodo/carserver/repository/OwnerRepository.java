package org.suhodo.carserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.suhodo.carserver.domain.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
}
