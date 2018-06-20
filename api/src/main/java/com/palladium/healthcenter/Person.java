package com.palladium.healthcenter;

import java.util.Date;
import java.util.Set;

public class Person {
    private String name;
    private Date dob;
    private String gender;
    private Integer id;
    private Boolean voided;
    private Set<PersonContact> contacts;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Boolean getVoided() {
        return voided;
    }

    public void setVoided(Boolean voided) {
        this.voided = voided;
    }

    public Set<PersonContact> getContacts() {
        return contacts;
    }

    public void setContacts(Set<PersonContact> contacts) {
        this.contacts = contacts;
    }
}