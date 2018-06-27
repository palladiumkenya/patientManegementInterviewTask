package com.patient.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.patient.application.domain.NextOfKin;

import com.patient.application.repository.NextOfKinRepository;
import com.patient.application.repository.search.NextOfKinSearchRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing NextOfKin.
 */
@RestController
@RequestMapping("/api")
public class NextOfKinResource {

    private final Logger log = LoggerFactory.getLogger(NextOfKinResource.class);

    private static final String ENTITY_NAME = "nextOfKin";

    private final NextOfKinRepository nextOfKinRepository;

    private final NextOfKinSearchRepository nextOfKinSearchRepository;

    public NextOfKinResource(NextOfKinRepository nextOfKinRepository, NextOfKinSearchRepository nextOfKinSearchRepository) {
        this.nextOfKinRepository = nextOfKinRepository;
        this.nextOfKinSearchRepository = nextOfKinSearchRepository;
    }

    /**
     * POST  /next-of-kins : Create a new nextOfKin.
     *
     * @param nextOfKin the nextOfKin to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nextOfKin, or with status 400 (Bad Request) if the nextOfKin has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/next-of-kins")
    @Timed
    public ResponseEntity<NextOfKin> createNextOfKin(@Valid @RequestBody NextOfKin nextOfKin) throws URISyntaxException {
        log.debug("REST request to save NextOfKin : {}", nextOfKin);
        if (nextOfKin.getId() != null) {
            throw new BadRequestAlertException("A new nextOfKin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NextOfKin result = nextOfKinRepository.save(nextOfKin);
        nextOfKinSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/next-of-kins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /next-of-kins : Updates an existing nextOfKin.
     *
     * @param nextOfKin the nextOfKin to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nextOfKin,
     * or with status 400 (Bad Request) if the nextOfKin is not valid,
     * or with status 500 (Internal Server Error) if the nextOfKin couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/next-of-kins")
    @Timed
    public ResponseEntity<NextOfKin> updateNextOfKin(@Valid @RequestBody NextOfKin nextOfKin) throws URISyntaxException {
        log.debug("REST request to update NextOfKin : {}", nextOfKin);
        if (nextOfKin.getId() == null) {
            return createNextOfKin(nextOfKin);
        }
        NextOfKin result = nextOfKinRepository.save(nextOfKin);
        nextOfKinSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nextOfKin.getId().toString()))
            .body(result);
    }

    /**
     * GET  /next-of-kins : get all the nextOfKins.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of nextOfKins in body
     */
    @GetMapping("/next-of-kins")
    @Timed
    public ResponseEntity<List<NextOfKin>> getAllNextOfKins(Pageable pageable) {
        log.debug("REST request to get a page of NextOfKins");
        Page<NextOfKin> page = nextOfKinRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/next-of-kins");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /next-of-kins/:id : get the "id" nextOfKin.
     *
     * @param id the id of the nextOfKin to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nextOfKin, or with status 404 (Not Found)
     */
    @GetMapping("/next-of-kins/{id}")
    @Timed
    public ResponseEntity<NextOfKin> getNextOfKin(@PathVariable Long id) {
        log.debug("REST request to get NextOfKin : {}", id);
        NextOfKin nextOfKin = nextOfKinRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(nextOfKin));
    }

    /**
     * DELETE  /next-of-kins/:id : delete the "id" nextOfKin.
     *
     * @param id the id of the nextOfKin to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/next-of-kins/{id}")
    @Timed
    public ResponseEntity<Void> deleteNextOfKin(@PathVariable Long id) {
        log.debug("REST request to delete NextOfKin : {}", id);
        nextOfKinRepository.delete(id);
        nextOfKinSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/next-of-kins?query=:query : search for the nextOfKin corresponding
     * to the query.
     *
     * @param query the query of the nextOfKin search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/next-of-kins")
    @Timed
    public ResponseEntity<List<NextOfKin>> searchNextOfKins(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of NextOfKins for query {}", query);
        Page<NextOfKin> page = nextOfKinSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/next-of-kins");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
