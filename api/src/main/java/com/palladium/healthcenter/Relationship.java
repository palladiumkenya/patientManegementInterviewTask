package com.palladium.healthcenter;

import java.util.Date;

public class Relationship {
    private Person person;
    private RelationshipType type;
    private Boolean voided;
    private Date dateCreated;

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person =person;
    }
    public RelationshipType getType() {
        return type;
    }

    public void setType(RelationshipType type) {
        this.type = type;
    }

    public Boolean getVoided() {
        return voided;
    }

    public void setVoided(Boolean voided) {
        this.voided = voided;
    }
}