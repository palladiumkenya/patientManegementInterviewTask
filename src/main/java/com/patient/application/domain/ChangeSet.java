package com.patient.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ChangeSet.
 */
@Entity
@Table(name = "change_set")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "changeset")
public class ChangeSet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "table_name", nullable = false)
    private String tableName;

    @NotNull
    @Column(name = "operation", nullable = false)
    private String operation;

    @Column(name = "column_name")
    private String columnName;

    @NotNull
    @Column(name = "entity", nullable = false)
    private Double entity;

    @NotNull
    @Column(name = "jhi_user", nullable = false)
    private String user;

    @Column(name = "old_value")
    private String oldValue;

    @Column(name = "new_value")
    private String newValue;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public ChangeSet tableName(String tableName) {
        this.tableName = tableName;
        return this;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getOperation() {
        return operation;
    }

    public ChangeSet operation(String operation) {
        this.operation = operation;
        return this;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getColumnName() {
        return columnName;
    }

    public ChangeSet columnName(String columnName) {
        this.columnName = columnName;
        return this;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public Double getEntity() {
        return entity;
    }

    public ChangeSet entity(Double entity) {
        this.entity = entity;
        return this;
    }

    public void setEntity(Double entity) {
        this.entity = entity;
    }

    public String getUser() {
        return user;
    }

    public ChangeSet user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getOldValue() {
        return oldValue;
    }

    public ChangeSet oldValue(String oldValue) {
        this.oldValue = oldValue;
        return this;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public ChangeSet newValue(String newValue) {
        this.newValue = newValue;
        return this;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
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
        ChangeSet changeSet = (ChangeSet) o;
        if (changeSet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), changeSet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChangeSet{" +
            "id=" + getId() +
            ", tableName='" + getTableName() + "'" +
            ", operation='" + getOperation() + "'" +
            ", columnName='" + getColumnName() + "'" +
            ", entity=" + getEntity() +
            ", user='" + getUser() + "'" +
            ", oldValue='" + getOldValue() + "'" +
            ", newValue='" + getNewValue() + "'" +
            "}";
    }
}
