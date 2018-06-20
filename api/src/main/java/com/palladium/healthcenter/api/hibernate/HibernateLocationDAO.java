package com.palladium.healthcenter.api.hibernate;

import com.palladium.healthcenter.*;
import com.palladium.healthcenter.api.HibernateUtil;
import org.hibernate.*;

import java.io.IOException;
import java.util.List;

public class HibernateLocationDAO {
    SessionFactory sessionFactory= HibernateUtil.getSessionFactory();
    public List<County> getAllCounties() throws IOException {
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        List<County> locationList=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(County.class);
            locationList=criteria.list();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return locationList;
    };
    public County saveCounty(County county) throws IOException{
        Session session=sessionFactory.openSession();
        Transaction transaction = null;
        try{
            transaction = session.beginTransaction();
            session.saveOrUpdate(county);
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        return county;
    };
    public SubCounty saveSubCounty(SubCounty subcounty) throws IOException{
        Session session=sessionFactory.openSession();
        Transaction transaction = null;
        try{
            transaction = session.beginTransaction();
            session.saveOrUpdate(subcounty);
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        return subcounty;
    };
    public Village saveVillage(Village village) throws IOException{
        Session session=sessionFactory.openSession();
        Transaction transaction = null;
        try{
            transaction = session.beginTransaction();
            session.saveOrUpdate(village);
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        return village;
    };
    public Ward saveWard(Ward ward) throws IOException{
        Session session=sessionFactory.openSession();
        Transaction transaction = null;
        try{
            transaction = session.beginTransaction();
            session.saveOrUpdate(ward);
            transaction.commit();
        }catch (HibernateException e) {
            if (transaction!=null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        return ward;
    };
}