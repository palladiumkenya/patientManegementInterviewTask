package com.palladium.healthcenter.api.hibernate;

import com.palladium.healthcenter.*;
import com.palladium.healthcenter.api.HibernateUtil;
import org.hibernate.*;
import org.hibernate.criterion.Restrictions;

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
    public List<SubCounty> getAllSubCounties() throws IOException {
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        List<SubCounty> subCountyList=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(SubCounty.class);
            subCountyList=criteria.list();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return subCountyList;
    };
    public List<Ward> getAllWards() throws IOException {
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        List<Ward> wardList=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(Ward.class);
            wardList=criteria.list();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return wardList;
    };
    public List<Village> getAllVillages() throws IOException {
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        List<Village> villageList=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(Village.class);
            villageList=criteria.list();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return villageList;
    };
    public County getCountyByName(String name) throws IOException {
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        County county=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(County.class);
            criteria.add(Restrictions.eq("name",name));
            county=(County)criteria.uniqueResult();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return county;
    };
    public SubCounty getSubCountyByName(String name) throws IOException {
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        SubCounty subCounty=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(SubCounty.class);
            criteria.add(Restrictions.eq("name",name));
            subCounty=(SubCounty)criteria.uniqueResult();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return subCounty;
    };
    public Ward getWardByName(String name) throws IOException {
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        Ward ward=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(Ward.class);
            criteria.add(Restrictions.eq("name",name));
            ward=(Ward)criteria.uniqueResult();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return ward;
    };
    public Village getVillageByName(String name) throws IOException {
        Session session=sessionFactory.openSession();
        Transaction transaction=null;
        Village village=null;
        try{
            transaction=session.beginTransaction();
            Criteria criteria=session.createCriteria(Village.class);
            criteria.add(Restrictions.eq("name",name));
            village=(Village)criteria.uniqueResult();
            transaction.commit();
        }
        catch(HibernateException e){
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return village;
    };
}