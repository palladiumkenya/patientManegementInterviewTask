package com.patient.application.repository.search;

import com.patient.application.domain.ChangeSet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ChangeSet entity.
 */
public interface ChangeSetSearchRepository extends ElasticsearchRepository<ChangeSet, Long> {
}
