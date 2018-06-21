package com.palladium.healthcenter;


import java.util.Date;

public class RelationshipType {
    private Integer id;
    private String relationshipOfAtoB;
    private String relationshipOfBtoA;
    private Boolean voided;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRelationshipOfAtoB() {
        return relationshipOfAtoB;
    }

    public void setRelationshipOfAtoB(String relationshipOfAtoB) {
        this.relationshipOfAtoB = relationshipOfAtoB;
    }

    public String getRelationshipOfBtoA() {
        return relationshipOfBtoA;
    }

    public void setRelationshipOfBtoA(String relationshipOfBtoA) {
        this.relationshipOfBtoA = relationshipOfBtoA;
    }

    public Boolean getVoided() {
        return voided;
    }

    public void setVoided(Boolean voided) {
        this.voided = voided;
    }

}