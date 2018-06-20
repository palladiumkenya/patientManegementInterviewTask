package com.palladium.healthcenter.api.hibernate;

import com.palladium.healthcenter.Patient;
import com.palladium.healthcenter.api.HibernateUtil;
import org.hibernate.*;

import java.io.IOException;
import java.util.List;

public class HibernatePatientDAO {
    SessionFactory sessionFactory= HibernateUtil.getSessionFactory();
    public List<Patient> getAllPatients() throws IOException {
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        List<Patient> patientList=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(Patient.class);
            patientList=criteria.list();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return patientList;
    };
    public Patient savePatient(Patient patient) throws IOException{
        Session session=sessionFactory.openSession();
        Transaction transaction = null;
        try{
            transaction = session.beginTransaction();
            session.saveOrUpdate(patient);
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        return patient;
    };
}