package com.palladium.healthcenter.api;

import com.palladium.healthcenter.Person;
import com.palladium.healthcenter.RelationshipType;
import com.palladium.healthcenter.api.hibernate.HibernatePersonDAO;

import java.io.IOException;
import java.util.List;

public class PersonService {
    HibernatePersonDAO personDAO=new HibernatePersonDAO();
    public List<Person> getAllPersons() throws IOException {
      return personDAO.getAllPersons();
    };
    public Person savePerson(Person person) throws IOException{
      return personDAO.savePerson(person);
    };
    public RelationshipType saveRelationshipType(RelationshipType type) throws IOException{
        return personDAO.saveRelationshipType(type);
    }
}