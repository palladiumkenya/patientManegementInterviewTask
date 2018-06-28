package com.patient.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A NextOfKin.
 */
@Entity
@Table(name = "next_of_kin")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "nextofkin")
public class NextOfKin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "surname", nullable = false)
    private String surname;

    @NotNull
    @Size(min = 3)
    @Column(name = "other_names", nullable = false)
    private String otherNames;

    @NotNull
    @Column(name = "id_number", nullable = false)
    private String idNumber;

    @OneToMany(mappedBy = "nextOfKin")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Patient> patients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSurname() {
        return surname;
    }

    public NextOfKin surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getOtherNames() {
        return otherNames;
    }

    public NextOfKin otherNames(String otherNames) {
        this.otherNames = otherNames;
        return this;
    }

    public void setOtherNames(String otherNames) {
        this.otherNames = otherNames;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public NextOfKin idNumber(String idNumber) {
        this.idNumber = idNumber;
        return this;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Set<Patient> getPatients() {
        return patients;
    }

    public NextOfKin patients(Set<Patient> patients) {
        this.patients = patients;
        return this;
    }

    public NextOfKin addPatient(Patient patient) {
        this.patients.add(patient);
        patient.setNextOfKin(this);
        return this;
    }

    public NextOfKin removePatient(Patient patient) {
        this.patients.remove(patient);
        patient.setNextOfKin(null);
        return this;
    }

    public void setPatients(Set<Patient> patients) {
        this.patients = patients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        NextOfKin nextOfKin = (NextOfKin) o;
        if (nextOfKin.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nextOfKin.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NextOfKin{" +
            "id=" + getId() +
            ", surname='" + getSurname() + "'" +
            ", otherNames='" + getOtherNames() + "'" +
            ", idNumber='" + getIdNumber() + "'" +
            "}";
    }
}
