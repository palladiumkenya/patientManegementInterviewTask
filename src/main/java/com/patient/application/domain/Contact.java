package com.patient.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Contact.
 */
@Entity
@Table(name = "contact")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "contact")
public class Contact implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "cell_phone", nullable = false)
    private String cellPhone;

    @NotNull
    @Size(min = 3)
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "alternative_cell_number")
    private String alternativeCellNumber;

    @OneToOne
    @JoinColumn(unique = true)
    private Patient patient;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCellPhone() {
        return cellPhone;
    }

    public Contact cellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
        return this;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public String getEmail() {
        return email;
    }

    public Contact email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAlternativeCellNumber() {
        return alternativeCellNumber;
    }

    public Contact alternativeCellNumber(String alternativeCellNumber) {
        this.alternativeCellNumber = alternativeCellNumber;
        return this;
    }

    public void setAlternativeCellNumber(String alternativeCellNumber) {
        this.alternativeCellNumber = alternativeCellNumber;
    }

    public Patient getPatient() {
        return patient;
    }

    public Contact patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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
        Contact contact = (Contact) o;
        if (contact.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contact.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Contact{" +
            "id=" + getId() +
            ", cellPhone='" + getCellPhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", alternativeCellNumber='" + getAlternativeCellNumber() + "'" +
            "}";
    }
}
