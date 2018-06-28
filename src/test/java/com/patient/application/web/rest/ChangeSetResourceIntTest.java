package com.patient.application.web.rest;

import com.patient.application.PatientManegementTaskApp;

import com.patient.application.domain.ChangeSet;
import com.patient.application.repository.ChangeSetRepository;
import com.patient.application.repository.search.ChangeSetSearchRepository;
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
 * Test class for the ChangeSetResource REST controller.
 *
 * @see ChangeSetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PatientManegementTaskApp.class)
public class ChangeSetResourceIntTest {

    private static final String DEFAULT_TABLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_OPERATION = "AAAAAAAAAA";
    private static final String UPDATED_OPERATION = "BBBBBBBBBB";

    private static final String DEFAULT_COLUMN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COLUMN_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_ENTITY = 1D;
    private static final Double UPDATED_ENTITY = 2D;

    private static final String DEFAULT_USER = "AAAAAAAAAA";
    private static final String UPDATED_USER = "BBBBBBBBBB";

    private static final String DEFAULT_OLD_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_OLD_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_NEW_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_NEW_VALUE = "BBBBBBBBBB";

    @Autowired
    private ChangeSetRepository changeSetRepository;

    @Autowired
    private ChangeSetSearchRepository changeSetSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChangeSetMockMvc;

    private ChangeSet changeSet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChangeSetResource changeSetResource = new ChangeSetResource(changeSetRepository, changeSetSearchRepository);
        this.restChangeSetMockMvc = MockMvcBuilders.standaloneSetup(changeSetResource)
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
    public static ChangeSet createEntity(EntityManager em) {
        ChangeSet changeSet = new ChangeSet()
            .tableName(DEFAULT_TABLE_NAME)
            .operation(DEFAULT_OPERATION)
            .columnName(DEFAULT_COLUMN_NAME)
            .entity(DEFAULT_ENTITY)
            .user(DEFAULT_USER)
            .oldValue(DEFAULT_OLD_VALUE)
            .newValue(DEFAULT_NEW_VALUE);
        return changeSet;
    }

    @Before
    public void initTest() {
        changeSetSearchRepository.deleteAll();
        changeSet = createEntity(em);
    }

    @Test
    @Transactional
    public void createChangeSet() throws Exception {
        int databaseSizeBeforeCreate = changeSetRepository.findAll().size();

        // Create the ChangeSet
        restChangeSetMockMvc.perform(post("/api/change-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changeSet)))
            .andExpect(status().isCreated());

        // Validate the ChangeSet in the database
        List<ChangeSet> changeSetList = changeSetRepository.findAll();
        assertThat(changeSetList).hasSize(databaseSizeBeforeCreate + 1);
        ChangeSet testChangeSet = changeSetList.get(changeSetList.size() - 1);
        assertThat(testChangeSet.getTableName()).isEqualTo(DEFAULT_TABLE_NAME);
        assertThat(testChangeSet.getOperation()).isEqualTo(DEFAULT_OPERATION);
        assertThat(testChangeSet.getColumnName()).isEqualTo(DEFAULT_COLUMN_NAME);
        assertThat(testChangeSet.getEntity()).isEqualTo(DEFAULT_ENTITY);
        assertThat(testChangeSet.getUser()).isEqualTo(DEFAULT_USER);
        assertThat(testChangeSet.getOldValue()).isEqualTo(DEFAULT_OLD_VALUE);
        assertThat(testChangeSet.getNewValue()).isEqualTo(DEFAULT_NEW_VALUE);

        // Validate the ChangeSet in Elasticsearch
        ChangeSet changeSetEs = changeSetSearchRepository.findOne(testChangeSet.getId());
        assertThat(changeSetEs).isEqualToIgnoringGivenFields(testChangeSet);
    }

    @Test
    @Transactional
    public void createChangeSetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = changeSetRepository.findAll().size();

        // Create the ChangeSet with an existing ID
        changeSet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChangeSetMockMvc.perform(post("/api/change-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changeSet)))
            .andExpect(status().isBadRequest());

        // Validate the ChangeSet in the database
        List<ChangeSet> changeSetList = changeSetRepository.findAll();
        assertThat(changeSetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTableNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = changeSetRepository.findAll().size();
        // set the field null
        changeSet.setTableName(null);

        // Create the ChangeSet, which fails.

        restChangeSetMockMvc.perform(post("/api/change-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changeSet)))
            .andExpect(status().isBadRequest());

        List<ChangeSet> changeSetList = changeSetRepository.findAll();
        assertThat(changeSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOperationIsRequired() throws Exception {
        int databaseSizeBeforeTest = changeSetRepository.findAll().size();
        // set the field null
        changeSet.setOperation(null);

        // Create the ChangeSet, which fails.

        restChangeSetMockMvc.perform(post("/api/change-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changeSet)))
            .andExpect(status().isBadRequest());

        List<ChangeSet> changeSetList = changeSetRepository.findAll();
        assertThat(changeSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEntityIsRequired() throws Exception {
        int databaseSizeBeforeTest = changeSetRepository.findAll().size();
        // set the field null
        changeSet.setEntity(null);

        // Create the ChangeSet, which fails.

        restChangeSetMockMvc.perform(post("/api/change-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changeSet)))
            .andExpect(status().isBadRequest());

        List<ChangeSet> changeSetList = changeSetRepository.findAll();
        assertThat(changeSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUserIsRequired() throws Exception {
        int databaseSizeBeforeTest = changeSetRepository.findAll().size();
        // set the field null
        changeSet.setUser(null);

        // Create the ChangeSet, which fails.

        restChangeSetMockMvc.perform(post("/api/change-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changeSet)))
            .andExpect(status().isBadRequest());

        List<ChangeSet> changeSetList = changeSetRepository.findAll();
        assertThat(changeSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChangeSets() throws Exception {
        // Initialize the database
        changeSetRepository.saveAndFlush(changeSet);

        // Get all the changeSetList
        restChangeSetMockMvc.perform(get("/api/change-sets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(changeSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].tableName").value(hasItem(DEFAULT_TABLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].operation").value(hasItem(DEFAULT_OPERATION.toString())))
            .andExpect(jsonPath("$.[*].columnName").value(hasItem(DEFAULT_COLUMN_NAME.toString())))
            .andExpect(jsonPath("$.[*].entity").value(hasItem(DEFAULT_ENTITY.doubleValue())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER.toString())))
            .andExpect(jsonPath("$.[*].oldValue").value(hasItem(DEFAULT_OLD_VALUE.toString())))
            .andExpect(jsonPath("$.[*].newValue").value(hasItem(DEFAULT_NEW_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getChangeSet() throws Exception {
        // Initialize the database
        changeSetRepository.saveAndFlush(changeSet);

        // Get the changeSet
        restChangeSetMockMvc.perform(get("/api/change-sets/{id}", changeSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(changeSet.getId().intValue()))
            .andExpect(jsonPath("$.tableName").value(DEFAULT_TABLE_NAME.toString()))
            .andExpect(jsonPath("$.operation").value(DEFAULT_OPERATION.toString()))
            .andExpect(jsonPath("$.columnName").value(DEFAULT_COLUMN_NAME.toString()))
            .andExpect(jsonPath("$.entity").value(DEFAULT_ENTITY.doubleValue()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER.toString()))
            .andExpect(jsonPath("$.oldValue").value(DEFAULT_OLD_VALUE.toString()))
            .andExpect(jsonPath("$.newValue").value(DEFAULT_NEW_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChangeSet() throws Exception {
        // Get the changeSet
        restChangeSetMockMvc.perform(get("/api/change-sets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChangeSet() throws Exception {
        // Initialize the database
        changeSetRepository.saveAndFlush(changeSet);
        changeSetSearchRepository.save(changeSet);
        int databaseSizeBeforeUpdate = changeSetRepository.findAll().size();

        // Update the changeSet
        ChangeSet updatedChangeSet = changeSetRepository.findOne(changeSet.getId());
        // Disconnect from session so that the updates on updatedChangeSet are not directly saved in db
        em.detach(updatedChangeSet);
        updatedChangeSet
            .tableName(UPDATED_TABLE_NAME)
            .operation(UPDATED_OPERATION)
            .columnName(UPDATED_COLUMN_NAME)
            .entity(UPDATED_ENTITY)
            .user(UPDATED_USER)
            .oldValue(UPDATED_OLD_VALUE)
            .newValue(UPDATED_NEW_VALUE);

        restChangeSetMockMvc.perform(put("/api/change-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChangeSet)))
            .andExpect(status().isOk());

        // Validate the ChangeSet in the database
        List<ChangeSet> changeSetList = changeSetRepository.findAll();
        assertThat(changeSetList).hasSize(databaseSizeBeforeUpdate);
        ChangeSet testChangeSet = changeSetList.get(changeSetList.size() - 1);
        assertThat(testChangeSet.getTableName()).isEqualTo(UPDATED_TABLE_NAME);
        assertThat(testChangeSet.getOperation()).isEqualTo(UPDATED_OPERATION);
        assertThat(testChangeSet.getColumnName()).isEqualTo(UPDATED_COLUMN_NAME);
        assertThat(testChangeSet.getEntity()).isEqualTo(UPDATED_ENTITY);
        assertThat(testChangeSet.getUser()).isEqualTo(UPDATED_USER);
        assertThat(testChangeSet.getOldValue()).isEqualTo(UPDATED_OLD_VALUE);
        assertThat(testChangeSet.getNewValue()).isEqualTo(UPDATED_NEW_VALUE);

        // Validate the ChangeSet in Elasticsearch
        ChangeSet changeSetEs = changeSetSearchRepository.findOne(testChangeSet.getId());
        assertThat(changeSetEs).isEqualToIgnoringGivenFields(testChangeSet);
    }

    @Test
    @Transactional
    public void updateNonExistingChangeSet() throws Exception {
        int databaseSizeBeforeUpdate = changeSetRepository.findAll().size();

        // Create the ChangeSet

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restChangeSetMockMvc.perform(put("/api/change-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(changeSet)))
            .andExpect(status().isCreated());

        // Validate the ChangeSet in the database
        List<ChangeSet> changeSetList = changeSetRepository.findAll();
        assertThat(changeSetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteChangeSet() throws Exception {
        // Initialize the database
        changeSetRepository.saveAndFlush(changeSet);
        changeSetSearchRepository.save(changeSet);
        int databaseSizeBeforeDelete = changeSetRepository.findAll().size();

        // Get the changeSet
        restChangeSetMockMvc.perform(delete("/api/change-sets/{id}", changeSet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean changeSetExistsInEs = changeSetSearchRepository.exists(changeSet.getId());
        assertThat(changeSetExistsInEs).isFalse();

        // Validate the database is empty
        List<ChangeSet> changeSetList = changeSetRepository.findAll();
        assertThat(changeSetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchChangeSet() throws Exception {
        // Initialize the database
        changeSetRepository.saveAndFlush(changeSet);
        changeSetSearchRepository.save(changeSet);

        // Search the changeSet
        restChangeSetMockMvc.perform(get("/api/_search/change-sets?query=id:" + changeSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(changeSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].tableName").value(hasItem(DEFAULT_TABLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].operation").value(hasItem(DEFAULT_OPERATION.toString())))
            .andExpect(jsonPath("$.[*].columnName").value(hasItem(DEFAULT_COLUMN_NAME.toString())))
            .andExpect(jsonPath("$.[*].entity").value(hasItem(DEFAULT_ENTITY.doubleValue())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER.toString())))
            .andExpect(jsonPath("$.[*].oldValue").value(hasItem(DEFAULT_OLD_VALUE.toString())))
            .andExpect(jsonPath("$.[*].newValue").value(hasItem(DEFAULT_NEW_VALUE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChangeSet.class);
        ChangeSet changeSet1 = new ChangeSet();
        changeSet1.setId(1L);
        ChangeSet changeSet2 = new ChangeSet();
        changeSet2.setId(changeSet1.getId());
        assertThat(changeSet1).isEqualTo(changeSet2);
        changeSet2.setId(2L);
        assertThat(changeSet1).isNotEqualTo(changeSet2);
        changeSet1.setId(null);
        assertThat(changeSet1).isNotEqualTo(changeSet2);
    }
}
