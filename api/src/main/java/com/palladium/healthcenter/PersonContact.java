package com.palladium.healthcenter;

import java.util.Date;

public class PersonContact {
    private Integer id;
    private int cellPhone;
    private String email;
    private int alternativeCellphone;
    private Boolean voided;
    private Person person;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(int cellPhone) {
        this.cellPhone = cellPhone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAlternativeCellphone() {
        return alternativeCellphone;
    }

    public void setAlternativeCellphone(int alternativeCellphone) {
        this.alternativeCellphone = alternativeCellphone;
    }

    public Boolean getVoided() {
        return voided;
    }

    public void setVoided(Boolean voided) {
        this.voided = voided;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}