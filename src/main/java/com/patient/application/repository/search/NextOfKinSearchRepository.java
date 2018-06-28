package com.patient.application.repository.search;

import com.patient.application.domain.NextOfKin;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the NextOfKin entity.
 */
public interface NextOfKinSearchRepository extends ElasticsearchRepository<NextOfKin, Long> {
}
