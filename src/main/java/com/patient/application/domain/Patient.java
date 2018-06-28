package com.patient.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "patient")
public class Patient implements Serializable {

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

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @NotNull
    @Size(min = 3)
    @Column(name = "county", nullable = false)
    private String county;

    @NotNull
    @Size(min = 3)
    @Column(name = "subcounty", nullable = false)
    private String subcounty;

    @NotNull
    @Size(min = 3)
    @Column(name = "ward", nullable = false)
    private String ward;

    @NotNull
    @Size(min = 3)
    @Column(name = "village", nullable = false)
    private String village;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Enrollment> enrollments = new HashSet<>();

    @ManyToOne
    private NextOfKin nextOfKin;

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

    public Patient surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getOtherNames() {
        return otherNames;
    }

    public Patient otherNames(String otherNames) {
        this.otherNames = otherNames;
        return this;
    }

    public void setOtherNames(String otherNames) {
        this.otherNames = otherNames;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Patient dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getCounty() {
        return county;
    }

    public Patient county(String county) {
        this.county = county;
        return this;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getSubcounty() {
        return subcounty;
    }

    public Patient subcounty(String subcounty) {
        this.subcounty = subcounty;
        return this;
    }

    public void setSubcounty(String subcounty) {
        this.subcounty = subcounty;
    }

    public String getWard() {
        return ward;
    }

    public Patient ward(String ward) {
        this.ward = ward;
        return this;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getVillage() {
        return village;
    }

    public Patient village(String village) {
        this.village = village;
        return this;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public Boolean isIsDeleted() {
        return isDeleted;
    }

    public Patient isDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
        return this;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Set<Enrollment> getEnrollments() {
        return enrollments;
    }

    public Patient enrollments(Set<Enrollment> enrollments) {
        this.enrollments = enrollments;
        return this;
    }

    public Patient addEnrollment(Enrollment enrollment) {
        this.enrollments.add(enrollment);
        enrollment.setPatient(this);
        return this;
    }

    public Patient removeEnrollment(Enrollment enrollment) {
        this.enrollments.remove(enrollment);
        enrollment.setPatient(null);
        return this;
    }

    public void setEnrollments(Set<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    public NextOfKin getNextOfKin() {
        return nextOfKin;
    }

    public Patient nextOfKin(NextOfKin nextOfKin) {
        this.nextOfKin = nextOfKin;
        return this;
    }

    public void setNextOfKin(NextOfKin nextOfKin) {
        this.nextOfKin = nextOfKin;
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
        Patient patient = (Patient) o;
        if (patient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", surname='" + getSurname() + "'" +
            ", otherNames='" + getOtherNames() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", county='" + getCounty() + "'" +
            ", subcounty='" + getSubcounty() + "'" +
            ", ward='" + getWard() + "'" +
            ", village='" + getVillage() + "'" +
            ", isDeleted='" + isIsDeleted() + "'" +
            "}";
    }
}
