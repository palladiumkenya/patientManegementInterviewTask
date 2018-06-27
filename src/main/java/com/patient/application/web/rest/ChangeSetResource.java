package com.patient.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.patient.application.domain.ChangeSet;

import com.patient.application.repository.ChangeSetRepository;
import com.patient.application.repository.search.ChangeSetSearchRepository;
import com.patient.application.web.rest.errors.BadRequestAlertException;
import com.patient.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing ChangeSet.
 */
@RestController
@RequestMapping("/api")
public class ChangeSetResource {

    private final Logger log = LoggerFactory.getLogger(ChangeSetResource.class);

    private static final String ENTITY_NAME = "changeSet";

    private final ChangeSetRepository changeSetRepository;

    private final ChangeSetSearchRepository changeSetSearchRepository;

    public ChangeSetResource(ChangeSetRepository changeSetRepository, ChangeSetSearchRepository changeSetSearchRepository) {
        this.changeSetRepository = changeSetRepository;
        this.changeSetSearchRepository = changeSetSearchRepository;
    }

    /**
     * POST  /change-sets : Create a new changeSet.
     *
     * @param changeSet the changeSet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new changeSet, or with status 400 (Bad Request) if the changeSet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/change-sets")
    @Timed
    public ResponseEntity<ChangeSet> createChangeSet(@Valid @RequestBody ChangeSet changeSet) throws URISyntaxException {
        log.debug("REST request to save ChangeSet : {}", changeSet);
        if (changeSet.getId() != null) {
            throw new BadRequestAlertException("A new changeSet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChangeSet result = changeSetRepository.save(changeSet);
        changeSetSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/change-sets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /change-sets : Updates an existing changeSet.
     *
     * @param changeSet the changeSet to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated changeSet,
     * or with status 400 (Bad Request) if the changeSet is not valid,
     * or with status 500 (Internal Server Error) if the changeSet couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/change-sets")
    @Timed
    public ResponseEntity<ChangeSet> updateChangeSet(@Valid @RequestBody ChangeSet changeSet) throws URISyntaxException {
        log.debug("REST request to update ChangeSet : {}", changeSet);
        if (changeSet.getId() == null) {
            return createChangeSet(changeSet);
        }
        ChangeSet result = changeSetRepository.save(changeSet);
        changeSetSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, changeSet.getId().toString()))
            .body(result);
    }

    /**
     * GET  /change-sets : get all the changeSets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of changeSets in body
     */
    @GetMapping("/change-sets")
    @Timed
    public List<ChangeSet> getAllChangeSets() {
        log.debug("REST request to get all ChangeSets");
        return changeSetRepository.findAll();
        }

    /**
     * GET  /change-sets/:id : get the "id" changeSet.
     *
     * @param id the id of the changeSet to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the changeSet, or with status 404 (Not Found)
     */
    @GetMapping("/change-sets/{id}")
    @Timed
    public ResponseEntity<ChangeSet> getChangeSet(@PathVariable Long id) {
        log.debug("REST request to get ChangeSet : {}", id);
        ChangeSet changeSet = changeSetRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(changeSet));
    }

    /**
     * DELETE  /change-sets/:id : delete the "id" changeSet.
     *
     * @param id the id of the changeSet to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/change-sets/{id}")
    @Timed
    public ResponseEntity<Void> deleteChangeSet(@PathVariable Long id) {
        log.debug("REST request to delete ChangeSet : {}", id);
        changeSetRepository.delete(id);
        changeSetSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/change-sets?query=:query : search for the changeSet corresponding
     * to the query.
     *
     * @param query the query of the changeSet search
     * @return the result of the search
     */
    @GetMapping("/_search/change-sets")
    @Timed
    public List<ChangeSet> searchChangeSets(@RequestParam String query) {
        log.debug("REST request to search ChangeSets for query {}", query);
        return StreamSupport
            .stream(changeSetSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
