package com.patient.application.repository;

import com.patient.application.domain.ChangeSet;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ChangeSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChangeSetRepository extends JpaRepository<ChangeSet, Long> {

}
