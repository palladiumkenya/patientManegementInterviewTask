package com.palladium.healthcenter.api;

import com.palladium.healthcenter.County;
import com.palladium.healthcenter.SubCounty;
import com.palladium.healthcenter.Village;
import com.palladium.healthcenter.Ward;
import com.palladium.healthcenter.api.hibernate.HibernateLocationDAO;

import java.io.IOException;
import java.util.List;

public class LocationService {
    HibernateLocationDAO locationDAO=new HibernateLocationDAO();
    public List<County> getAllCounties() throws IOException{
        return locationDAO.getAllCounties();
    }
    public County saveCounty(County county) throws IOException{
        return locationDAO.saveCounty(county);
    }
    public SubCounty saveSubCounty(SubCounty subcounty) throws IOException{
        return locationDAO.saveSubCounty(subcounty);
    }
    public Village saveVillage(Village village) throws IOException{
        return locationDAO.saveVillage(village);
    }
    public Ward saveWard(Ward ward) throws IOException{
        return locationDAO.saveWard(ward);
    }
}