package com.patient.application.repository;

import com.patient.application.domain.NextOfKin;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the NextOfKin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NextOfKinRepository extends JpaRepository<NextOfKin, Long> {

}
