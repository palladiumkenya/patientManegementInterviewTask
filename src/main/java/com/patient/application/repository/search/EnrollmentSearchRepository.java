package com.patient.application.repository.search;

import com.patient.application.domain.Enrollment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Enrollment entity.
 */
public interface EnrollmentSearchRepository extends ElasticsearchRepository<Enrollment, Long> {
}
