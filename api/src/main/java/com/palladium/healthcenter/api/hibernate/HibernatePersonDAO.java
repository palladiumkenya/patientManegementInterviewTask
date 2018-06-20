package com.palladium.healthcenter.api.hibernate;

import com.palladium.healthcenter.Person;
import com.palladium.healthcenter.RelationshipType;
import com.palladium.healthcenter.api.HibernateUtil;
import org.hibernate.*;
import org.hibernate.cfg.Configuration;

import java.io.IOException;
import java.util.List;

public class HibernatePersonDAO {
    SessionFactory sessionFactory= HibernateUtil.getSessionFactory();
    public List<Person> getAllPersons() throws IOException{
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        List<Person> personList=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(Person.class);
            personList=criteria.list();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return personList;
    };
    public Person savePerson(Person person) throws IOException{
        Session session=sessionFactory.openSession();
        Transaction transaction = null;
        try{
            transaction = session.beginTransaction();
            session.saveOrUpdate(person);
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        return person;
    };
    public RelationshipType saveRelationshipType(RelationshipType type) throws IOException{
        Session session=sessionFactory.openSession();
        Transaction transaction = null;
        try{
            transaction = session.beginTransaction();
            session.saveOrUpdate(type);
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        return type;
    };
}