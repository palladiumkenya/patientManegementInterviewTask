package com.palladium.healthcenter;


import com.palladium.healthcenter.api.LocationService;
import com.palladium.healthcenter.api.PersonService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Controller
public class PatientManagerController{
    @RequestMapping(value="/getAllPersons.form",method = RequestMethod.GET)
    public void getAllPersons(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PersonService personService=new PersonService();
        List<Person> personList=personService.getAllPersons();
        JSONObject jsonObject=new JSONObject();
        JSONObject personJsonObject;
        JSONArray personJsonArray=new JSONArray();
        for(Person person:personList){
            personJsonObject=new JSONObject();
            personJsonObject.put("name",person.getName());
            personJsonObject.put("gender", person.getGender());
            personJsonArray.add(personJsonObject);
        }
        jsonObject.put("persons", personJsonArray);
        response.getWriter().print(jsonObject);
    }
    @RequestMapping(value="/personByName.form",method = RequestMethod.GET)
    public void getPersonByName(){
    }
    @RequestMapping(value="/savePerson.form",method=RequestMethod.POST)
    public void savePatient(@RequestBody String request,HttpServletResponse response){
        JSONParser parser=new JSONParser();
        PersonService personService=new PersonService();
        try {
            Object object=parser.parse(request);
            JSONObject jObj=(JSONObject)object;
            String name,gender;
            if(jObj.get("person")!=null){
                JSONObject personJson=(JSONObject)jObj.get("person");
                Person person=new Person();
                name=(String)personJson.get("name");
                gender=(String)personJson.get("gender");
                person.setName(name);
                person.setGender(gender);
                personService.savePerson(person);
            }
        } catch (ParseException e) {

        }
        catch (IOException e){

        }
    }
    @RequestMapping(value="/saveCounty.form",method=RequestMethod.POST)
    public void saveCounty(HttpServletRequest request,HttpServletResponse response) throws IOException, ParseException {
        JSONParser parser=new JSONParser();
        LocationService locationService=new LocationService();
        String payload=request.getParameter("form");
        Object object=parser.parse(payload);
        JSONArray jsonArray=(JSONArray)object;
        County county=new County();
        JSONObject currentObject;
        String currentName,currentValue;
        for(int i=0; i<jsonArray.size(); i++){
            currentObject=(JSONObject)jsonArray.get(i);
            currentName=(String)currentObject.get("name");
            currentValue=(String)currentObject.get("value");
            if(currentName.equalsIgnoreCase("county")){
                county.setName(currentValue);
            }
        }
        county.setVoided(false);
        locationService.saveCounty(county);
        response.getWriter().print("payload success");
    }
    @RequestMapping(value="/saveSubCounty.form",method=RequestMethod.POST)
    public void saveSubCounty(HttpServletRequest request,HttpServletResponse response) throws IOException, ParseException {
        JSONParser parser=new JSONParser();
        LocationService locationService=new LocationService();
        String payload=request.getParameter("form");
        Object object=parser.parse(payload);
        JSONArray jsonArray=(JSONArray)object;
        SubCounty subCounty=new SubCounty();
        JSONObject currentObject;
        String currentName,currentValue;
        for(int i=0; i<jsonArray.size(); i++){
            currentObject=(JSONObject)jsonArray.get(i);
            currentName=(String)currentObject.get("name");
            currentValue=(String)currentObject.get("value");
            if(currentName.equalsIgnoreCase("subcounty")){
                subCounty.setName(currentValue);
            }
        }
        subCounty.setVoided(false);
        locationService.saveSubCounty(subCounty);
        response.getWriter().print("payload success");
    }
    @RequestMapping(value="/saveWard.form",method=RequestMethod.POST)
    public void saveWard(HttpServletRequest request,HttpServletResponse response) throws IOException, ParseException {
        JSONParser parser=new JSONParser();
        LocationService locationService=new LocationService();
        String payload=request.getParameter("form");
        Object object=parser.parse(payload);
        JSONArray jsonArray=(JSONArray)object;
        Ward ward=new Ward();
        JSONObject currentObject;
        String currentName,currentValue;
        for(int i=0; i<jsonArray.size(); i++){
            currentObject=(JSONObject)jsonArray.get(i);
            currentName=(String)currentObject.get("name");
            currentValue=(String)currentObject.get("value");
            if(currentName.equalsIgnoreCase("ward")){
                ward.setName(currentValue);
            }
        }
        ward.setVoided(false);
        locationService.saveWard(ward);
        response.getWriter().print("payload success");
    }
    @RequestMapping(value="/saveVillage.form",method=RequestMethod.POST)
    public void saveVillage(HttpServletRequest request,HttpServletResponse response) throws IOException, ParseException {
        JSONParser parser=new JSONParser();
        LocationService locationService=new LocationService();
        String payload=request.getParameter("form");
        Object object=parser.parse(payload);
        JSONArray jsonArray=(JSONArray)object;
        Village village=new Village();
        JSONObject currentObject;
        String currentName,currentValue;
        for(int i=0; i<jsonArray.size(); i++){
            currentObject=(JSONObject)jsonArray.get(i);
            currentName=(String)currentObject.get("name");
            currentValue=(String)currentObject.get("value");
            if(currentName.equalsIgnoreCase("village")){
                village.setName(currentValue);
            }
        }
        village.setVoided(false);
        locationService.saveVillage(village);
        response.getWriter().print("payload success");
    }
    @RequestMapping(value="/saveRelationshipType.form",method=RequestMethod.POST)
    public void saveRelationshipType(HttpServletRequest request,HttpServletResponse response) throws IOException, ParseException {
        JSONParser parser=new JSONParser();
        PersonService personService=new PersonService();
        String payload=request.getParameter("form");
        Object object=parser.parse(payload);
        JSONArray jsonArray=(JSONArray)object;
        RelationshipType relationshipType=new RelationshipType();
        JSONObject currentObject;
        String currentName,currentValue;
        System.out.println("save relationship type payload++++++++++++++++++++++++++++++++++++++"+payload);
        for(int i=0; i<jsonArray.size(); i++){
            currentObject=(JSONObject)jsonArray.get(i);
            currentName=(String)currentObject.get("name");
            currentValue=(String)currentObject.get("value");
            if(currentName.equalsIgnoreCase("a_to_b")){
                relationshipType.setRelationshipOfAtoB(currentValue);
            }
            else if(currentName.equalsIgnoreCase("b_to_a")){
                relationshipType.setRelationshipOfBtoA(currentValue);
            }
        }
        Date today=new Date();
        relationshipType.setVoided(false);
        personService.saveRelationshipType(relationshipType);
        response.getWriter().print("payload success");
    }
    /*@RequestMapping(value="/getAllLocations.form",method = RequestMethod.GET)
    public void getAllLocations(HttpServletRequest request,HttpServletResponse response) throws IOException {
        LocationService locationService=new LocationService();
        List<Location> locationList=locationService.getAllLocations();
        JSONObject jsonObject=new JSONObject();
        JSONObject locationJsonObject;
        JSONArray locationJsonArray=new JSONArray();
        for(Location location:locationList){
            locationJsonObject=new JSONObject();
            locationJsonObject.put("name",);
            locationJsonObject.put("gender", person.getGender());
            personJsonArray.add(personJsonObject);
        }
        jsonObject.put("persons", personJsonArray);
        response.getWriter().print(jsonObject);
    }*/
}