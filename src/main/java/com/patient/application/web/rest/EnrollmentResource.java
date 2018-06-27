package com.patient.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.patient.application.domain.Enrollment;

import com.patient.application.repository.EnrollmentRepository;
import com.patient.application.repository.search.EnrollmentSearchRepository;
import com.patient.application.web.rest.errors.BadRequestAlertException;
import com.patient.application.web.rest.util.HeaderUtil;
import com.patient.application.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Enrollment.
 */
@RestController
@RequestMapping("/api")
public class EnrollmentResource {

    private final Logger log = LoggerFactory.getLogger(EnrollmentResource.class);

    private static final String ENTITY_NAME = "enrollment";

    private final EnrollmentRepository enrollmentRepository;

    private final EnrollmentSearchRepository enrollmentSearchRepository;

    public EnrollmentResource(EnrollmentRepository enrollmentRepository, EnrollmentSearchRepository enrollmentSearchRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.enrollmentSearchRepository = enrollmentSearchRepository;
    }

    /**
     * POST  /enrollments : Create a new enrollment.
     *
     * @param enrollment the enrollment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enrollment, or with status 400 (Bad Request) if the enrollment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enrollments")
    @Timed
    public ResponseEntity<Enrollment> createEnrollment(@RequestBody Enrollment enrollment) throws URISyntaxException {
        log.debug("REST request to save Enrollment : {}", enrollment);
        if (enrollment.getId() != null) {
            throw new BadRequestAlertException("A new enrollment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enrollment result = enrollmentRepository.save(enrollment);
        enrollmentSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/enrollments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enrollments : Updates an existing enrollment.
     *
     * @param enrollment the enrollment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enrollment,
     * or with status 400 (Bad Request) if the enrollment is not valid,
     * or with status 500 (Internal Server Error) if the enrollment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enrollments")
    @Timed
    public ResponseEntity<Enrollment> updateEnrollment(@RequestBody Enrollment enrollment) throws URISyntaxException {
        log.debug("REST request to update Enrollment : {}", enrollment);
        if (enrollment.getId() == null) {
            return createEnrollment(enrollment);
        }
        Enrollment result = enrollmentRepository.save(enrollment);
        enrollmentSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enrollment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enrollments : get all the enrollments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of enrollments in body
     */
    @GetMapping("/enrollments")
    @Timed
    public ResponseEntity<List<Enrollment>> getAllEnrollments(Pageable pageable) {
        log.debug("REST request to get a page of Enrollments");
        Page<Enrollment> page = enrollmentRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/enrollments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /enrollments/:id : get the "id" enrollment.
     *
     * @param id the id of the enrollment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enrollment, or with status 404 (Not Found)
     */
    @GetMapping("/enrollments/{id}")
    @Timed
    public ResponseEntity<Enrollment> getEnrollment(@PathVariable Long id) {
        log.debug("REST request to get Enrollment : {}", id);
        Enrollment enrollment = enrollmentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(enrollment));
    }

    /**
     * DELETE  /enrollments/:id : delete the "id" enrollment.
     *
     * @param id the id of the enrollment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enrollments/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        log.debug("REST request to delete Enrollment : {}", id);
        enrollmentRepository.delete(id);
        enrollmentSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/enrollments?query=:query : search for the enrollment corresponding
     * to the query.
     *
     * @param query the query of the enrollment search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/enrollments")
    @Timed
    public ResponseEntity<List<Enrollment>> searchEnrollments(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Enrollments for query {}", query);
        Page<Enrollment> page = enrollmentSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/enrollments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
