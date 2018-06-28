package com.patient.application.web.rest;

import com.patient.application.PatientManegementTaskApp;

import com.patient.application.domain.Enrollment;
import com.patient.application.repository.EnrollmentRepository;
import com.patient.application.repository.search.EnrollmentSearchRepository;
import com.patient.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.patient.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EnrollmentResource REST controller.
 *
 * @see EnrollmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PatientManegementTaskApp.class)
public class EnrollmentResourceIntTest {

    private static final LocalDate DEFAULT_ENROLLMENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ENROLLMENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ENROLLMENT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ENROLLMENT_NUMBER = "BBBBBBBBBB";

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private EnrollmentSearchRepository enrollmentSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnrollmentMockMvc;

    private Enrollment enrollment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnrollmentResource enrollmentResource = new EnrollmentResource(enrollmentRepository, enrollmentSearchRepository);
        this.restEnrollmentMockMvc = MockMvcBuilders.standaloneSetup(enrollmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enrollment createEntity(EntityManager em) {
        Enrollment enrollment = new Enrollment()
            .enrollmentDate(DEFAULT_ENROLLMENT_DATE)
            .enrollmentNumber(DEFAULT_ENROLLMENT_NUMBER);
        return enrollment;
    }

    @Before
    public void initTest() {
        enrollmentSearchRepository.deleteAll();
        enrollment = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnrollment() throws Exception {
        int databaseSizeBeforeCreate = enrollmentRepository.findAll().size();

        // Create the Enrollment
        restEnrollmentMockMvc.perform(post("/api/enrollments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment)))
            .andExpect(status().isCreated());

        // Validate the Enrollment in the database
        List<Enrollment> enrollmentList = enrollmentRepository.findAll();
        assertThat(enrollmentList).hasSize(databaseSizeBeforeCreate + 1);
        Enrollment testEnrollment = enrollmentList.get(enrollmentList.size() - 1);
        assertThat(testEnrollment.getEnrollmentDate()).isEqualTo(DEFAULT_ENROLLMENT_DATE);
        assertThat(testEnrollment.getEnrollmentNumber()).isEqualTo(DEFAULT_ENROLLMENT_NUMBER);

        // Validate the Enrollment in Elasticsearch
        Enrollment enrollmentEs = enrollmentSearchRepository.findOne(testEnrollment.getId());
        assertThat(enrollmentEs).isEqualToIgnoringGivenFields(testEnrollment);
    }

    @Test
    @Transactional
    public void createEnrollmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enrollmentRepository.findAll().size();

        // Create the Enrollment with an existing ID
        enrollment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnrollmentMockMvc.perform(post("/api/enrollments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment)))
            .andExpect(status().isBadRequest());

        // Validate the Enrollment in the database
        List<Enrollment> enrollmentList = enrollmentRepository.findAll();
        assertThat(enrollmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEnrollments() throws Exception {
        // Initialize the database
        enrollmentRepository.saveAndFlush(enrollment);

        // Get all the enrollmentList
        restEnrollmentMockMvc.perform(get("/api/enrollments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enrollment.getId().intValue())))
            .andExpect(jsonPath("$.[*].enrollmentDate").value(hasItem(DEFAULT_ENROLLMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].enrollmentNumber").value(hasItem(DEFAULT_ENROLLMENT_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getEnrollment() throws Exception {
        // Initialize the database
        enrollmentRepository.saveAndFlush(enrollment);

        // Get the enrollment
        restEnrollmentMockMvc.perform(get("/api/enrollments/{id}", enrollment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enrollment.getId().intValue()))
            .andExpect(jsonPath("$.enrollmentDate").value(DEFAULT_ENROLLMENT_DATE.toString()))
            .andExpect(jsonPath("$.enrollmentNumber").value(DEFAULT_ENROLLMENT_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEnrollment() throws Exception {
        // Get the enrollment
        restEnrollmentMockMvc.perform(get("/api/enrollments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnrollment() throws Exception {
        // Initialize the database
        enrollmentRepository.saveAndFlush(enrollment);
        enrollmentSearchRepository.save(enrollment);
        int databaseSizeBeforeUpdate = enrollmentRepository.findAll().size();

        // Update the enrollment
        Enrollment updatedEnrollment = enrollmentRepository.findOne(enrollment.getId());
        // Disconnect from session so that the updates on updatedEnrollment are not directly saved in db
        em.detach(updatedEnrollment);
        updatedEnrollment
            .enrollmentDate(UPDATED_ENROLLMENT_DATE)
            .enrollmentNumber(UPDATED_ENROLLMENT_NUMBER);

        restEnrollmentMockMvc.perform(put("/api/enrollments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnrollment)))
            .andExpect(status().isOk());

        // Validate the Enrollment in the database
        List<Enrollment> enrollmentList = enrollmentRepository.findAll();
        assertThat(enrollmentList).hasSize(databaseSizeBeforeUpdate);
        Enrollment testEnrollment = enrollmentList.get(enrollmentList.size() - 1);
        assertThat(testEnrollment.getEnrollmentDate()).isEqualTo(UPDATED_ENROLLMENT_DATE);
        assertThat(testEnrollment.getEnrollmentNumber()).isEqualTo(UPDATED_ENROLLMENT_NUMBER);

        // Validate the Enrollment in Elasticsearch
        Enrollment enrollmentEs = enrollmentSearchRepository.findOne(testEnrollment.getId());
        assertThat(enrollmentEs).isEqualToIgnoringGivenFields(testEnrollment);
    }

    @Test
    @Transactional
    public void updateNonExistingEnrollment() throws Exception {
        int databaseSizeBeforeUpdate = enrollmentRepository.findAll().size();

        // Create the Enrollment

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnrollmentMockMvc.perform(put("/api/enrollments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enrollment)))
            .andExpect(status().isCreated());

        // Validate the Enrollment in the database
        List<Enrollment> enrollmentList = enrollmentRepository.findAll();
        assertThat(enrollmentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEnrollment() throws Exception {
        // Initialize the database
        enrollmentRepository.saveAndFlush(enrollment);
        enrollmentSearchRepository.save(enrollment);
        int databaseSizeBeforeDelete = enrollmentRepository.findAll().size();

        // Get the enrollment
        restEnrollmentMockMvc.perform(delete("/api/enrollments/{id}", enrollment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean enrollmentExistsInEs = enrollmentSearchRepository.exists(enrollment.getId());
        assertThat(enrollmentExistsInEs).isFalse();

        // Validate the database is empty
        List<Enrollment> enrollmentList = enrollmentRepository.findAll();
        assertThat(enrollmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEnrollment() throws Exception {
        // Initialize the database
        enrollmentRepository.saveAndFlush(enrollment);
        enrollmentSearchRepository.save(enrollment);

        // Search the enrollment
        restEnrollmentMockMvc.perform(get("/api/_search/enrollments?query=id:" + enrollment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enrollment.getId().intValue())))
            .andExpect(jsonPath("$.[*].enrollmentDate").value(hasItem(DEFAULT_ENROLLMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].enrollmentNumber").value(hasItem(DEFAULT_ENROLLMENT_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enrollment.class);
        Enrollment enrollment1 = new Enrollment();
        enrollment1.setId(1L);
        Enrollment enrollment2 = new Enrollment();
        enrollment2.setId(enrollment1.getId());
        assertThat(enrollment1).isEqualTo(enrollment2);
        enrollment2.setId(2L);
        assertThat(enrollment1).isNotEqualTo(enrollment2);
        enrollment1.setId(null);
        assertThat(enrollment1).isNotEqualTo(enrollment2);
    }
}
