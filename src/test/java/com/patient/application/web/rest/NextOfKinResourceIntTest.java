package com.patient.application.web.rest;

import com.patient.application.PatientManegementTaskApp;

import com.patient.application.domain.NextOfKin;
import com.patient.application.repository.NextOfKinRepository;
import com.patient.application.repository.search.NextOfKinSearchRepository;
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
import java.util.List;

import static com.patient.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NextOfKinResource REST controller.
 *
 * @see NextOfKinResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PatientManegementTaskApp.class)
public class NextOfKinResourceIntTest {

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_OTHER_NAMES = "AAAAAAAAAA";
    private static final String UPDATED_OTHER_NAMES = "BBBBBBBBBB";

    private static final String DEFAULT_ID_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ID_NUMBER = "BBBBBBBBBB";

    @Autowired
    private NextOfKinRepository nextOfKinRepository;

    @Autowired
    private NextOfKinSearchRepository nextOfKinSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNextOfKinMockMvc;

    private NextOfKin nextOfKin;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NextOfKinResource nextOfKinResource = new NextOfKinResource(nextOfKinRepository, nextOfKinSearchRepository);
        this.restNextOfKinMockMvc = MockMvcBuilders.standaloneSetup(nextOfKinResource)
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
    public static NextOfKin createEntity(EntityManager em) {
        NextOfKin nextOfKin = new NextOfKin()
            .surname(DEFAULT_SURNAME)
            .otherNames(DEFAULT_OTHER_NAMES)
            .idNumber(DEFAULT_ID_NUMBER);
        return nextOfKin;
    }

    @Before
    public void initTest() {
        nextOfKinSearchRepository.deleteAll();
        nextOfKin = createEntity(em);
    }

    @Test
    @Transactional
    public void createNextOfKin() throws Exception {
        int databaseSizeBeforeCreate = nextOfKinRepository.findAll().size();

        // Create the NextOfKin
        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isCreated());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeCreate + 1);
        NextOfKin testNextOfKin = nextOfKinList.get(nextOfKinList.size() - 1);
        assertThat(testNextOfKin.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testNextOfKin.getOtherNames()).isEqualTo(DEFAULT_OTHER_NAMES);
        assertThat(testNextOfKin.getIdNumber()).isEqualTo(DEFAULT_ID_NUMBER);

        // Validate the NextOfKin in Elasticsearch
        NextOfKin nextOfKinEs = nextOfKinSearchRepository.findOne(testNextOfKin.getId());
        assertThat(nextOfKinEs).isEqualToIgnoringGivenFields(testNextOfKin);
    }

    @Test
    @Transactional
    public void createNextOfKinWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nextOfKinRepository.findAll().size();

        // Create the NextOfKin with an existing ID
        nextOfKin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isBadRequest());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSurnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = nextOfKinRepository.findAll().size();
        // set the field null
        nextOfKin.setSurname(null);

        // Create the NextOfKin, which fails.

        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isBadRequest());

        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOtherNamesIsRequired() throws Exception {
        int databaseSizeBeforeTest = nextOfKinRepository.findAll().size();
        // set the field null
        nextOfKin.setOtherNames(null);

        // Create the NextOfKin, which fails.

        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isBadRequest());

        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIdNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = nextOfKinRepository.findAll().size();
        // set the field null
        nextOfKin.setIdNumber(null);

        // Create the NextOfKin, which fails.

        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isBadRequest());

        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNextOfKins() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        // Get all the nextOfKinList
        restNextOfKinMockMvc.perform(get("/api/next-of-kins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nextOfKin.getId().intValue())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].otherNames").value(hasItem(DEFAULT_OTHER_NAMES.toString())))
            .andExpect(jsonPath("$.[*].idNumber").value(hasItem(DEFAULT_ID_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        // Get the nextOfKin
        restNextOfKinMockMvc.perform(get("/api/next-of-kins/{id}", nextOfKin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nextOfKin.getId().intValue()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()))
            .andExpect(jsonPath("$.otherNames").value(DEFAULT_OTHER_NAMES.toString()))
            .andExpect(jsonPath("$.idNumber").value(DEFAULT_ID_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNextOfKin() throws Exception {
        // Get the nextOfKin
        restNextOfKinMockMvc.perform(get("/api/next-of-kins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);
        nextOfKinSearchRepository.save(nextOfKin);
        int databaseSizeBeforeUpdate = nextOfKinRepository.findAll().size();

        // Update the nextOfKin
        NextOfKin updatedNextOfKin = nextOfKinRepository.findOne(nextOfKin.getId());
        // Disconnect from session so that the updates on updatedNextOfKin are not directly saved in db
        em.detach(updatedNextOfKin);
        updatedNextOfKin
            .surname(UPDATED_SURNAME)
            .otherNames(UPDATED_OTHER_NAMES)
            .idNumber(UPDATED_ID_NUMBER);

        restNextOfKinMockMvc.perform(put("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNextOfKin)))
            .andExpect(status().isOk());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeUpdate);
        NextOfKin testNextOfKin = nextOfKinList.get(nextOfKinList.size() - 1);
        assertThat(testNextOfKin.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testNextOfKin.getOtherNames()).isEqualTo(UPDATED_OTHER_NAMES);
        assertThat(testNextOfKin.getIdNumber()).isEqualTo(UPDATED_ID_NUMBER);

        // Validate the NextOfKin in Elasticsearch
        NextOfKin nextOfKinEs = nextOfKinSearchRepository.findOne(testNextOfKin.getId());
        assertThat(nextOfKinEs).isEqualToIgnoringGivenFields(testNextOfKin);
    }

    @Test
    @Transactional
    public void updateNonExistingNextOfKin() throws Exception {
        int databaseSizeBeforeUpdate = nextOfKinRepository.findAll().size();

        // Create the NextOfKin

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNextOfKinMockMvc.perform(put("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isCreated());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);
        nextOfKinSearchRepository.save(nextOfKin);
        int databaseSizeBeforeDelete = nextOfKinRepository.findAll().size();

        // Get the nextOfKin
        restNextOfKinMockMvc.perform(delete("/api/next-of-kins/{id}", nextOfKin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean nextOfKinExistsInEs = nextOfKinSearchRepository.exists(nextOfKin.getId());
        assertThat(nextOfKinExistsInEs).isFalse();

        // Validate the database is empty
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);
        nextOfKinSearchRepository.save(nextOfKin);

        // Search the nextOfKin
        restNextOfKinMockMvc.perform(get("/api/_search/next-of-kins?query=id:" + nextOfKin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nextOfKin.getId().intValue())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].otherNames").value(hasItem(DEFAULT_OTHER_NAMES.toString())))
            .andExpect(jsonPath("$.[*].idNumber").value(hasItem(DEFAULT_ID_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NextOfKin.class);
        NextOfKin nextOfKin1 = new NextOfKin();
        nextOfKin1.setId(1L);
        NextOfKin nextOfKin2 = new NextOfKin();
        nextOfKin2.setId(nextOfKin1.getId());
        assertThat(nextOfKin1).isEqualTo(nextOfKin2);
        nextOfKin2.setId(2L);
        assertThat(nextOfKin1).isNotEqualTo(nextOfKin2);
        nextOfKin1.setId(null);
        assertThat(nextOfKin1).isNotEqualTo(nextOfKin2);
    }
}
