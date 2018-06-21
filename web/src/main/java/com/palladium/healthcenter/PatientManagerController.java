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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
            personJsonObject.put("name",person.getFirstName());
            personJsonObject.put("gender", person.getGender());
            personJsonArray.add(personJsonObject);
        }
        jsonObject.put("persons", personJsonArray);
        response.getWriter().print(jsonObject);
    }
    @RequestMapping(value="/getAllCounties.form",method = RequestMethod.GET)
    public void getAllCounties(HttpServletRequest request,HttpServletResponse response) throws IOException {
        LocationService locationService=new LocationService();
        List<County> countyList=locationService.getAllCounties();
        JSONObject jsonObject=new JSONObject();
        JSONObject countyJsonObject;
        JSONArray countyJsonArray=new JSONArray();
        for(County county:countyList){
            countyJsonObject=new JSONObject();
            countyJsonObject.put("name", county.getName());
            countyJsonArray.add(countyJsonObject);
        }
        jsonObject.put("counties", countyJsonArray);
        response.getWriter().print(jsonObject);
    }
    @RequestMapping(value="/personByName.form",method = RequestMethod.GET)
    public void getPersonByName(){
    }
   /* @RequestMapping(value="/savePerson.form",method=RequestMethod.POST)
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
                person.setFirstName(name);
                person.setGender(gender);
                personService.savePerson(person);
            }
        } catch (ParseException e) {

        }
        catch (IOException e){

        }
    }*/
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
    @RequestMapping(value="/savePatient.form",method=RequestMethod.POST)
    public void savePatient(HttpServletRequest request,HttpServletResponse response) throws IOException, ParseException {
        LocationService locationService=new LocationService();
        PersonService personService=new PersonService();
        JSONParser parser=new JSONParser();
        String payload=request.getParameter("form");
        Object object=parser.parse(payload);
        System.out.println("save patient payload +++++++++++++++++++++++"+payload);
        JSONArray jsonArray=(JSONArray)object;
        Patient patient=new Patient();
        Person person=new Person();
        JSONObject currentObject;
        String currentName,currentValue;
        County county;
        SubCounty subCounty;
        Ward ward;
        Village village;
        Set<PersonContact> personContactSet=new HashSet<PersonContact>();
        PersonContact personContact=new PersonContact();
        for(int i=0; i<jsonArray.size(); i++){
            currentObject=(JSONObject)jsonArray.get(i);
            currentName=(String)currentObject.get("name");
            currentValue=(String)currentObject.get("value");
            if(currentName.equalsIgnoreCase("fname")){
                person.setFirstName(currentValue);
            }
            else if(currentName.equalsIgnoreCase("lname")){
                person.setLastName(currentValue);
            }
            else if(currentName.equalsIgnoreCase("person_county")){
                county=locationService.getCountyByName(currentValue);
                person.setCounty(county);
            }
            else if(currentName.equalsIgnoreCase("gender")){
                person.setGender(currentValue);
            }
            else if(currentName.equalsIgnoreCase("person_subcounty")){
                subCounty=locationService.getSubCountyByName(currentValue);
                System.out.println("subcounty object +++++++++++++++++++++++++++"+subCounty);
                person.setSubCounty(subCounty);
            }
            else if(currentName.equalsIgnoreCase("person_ward")){
                ward=locationService.getWardByName(currentValue);
                person.setWard(ward);
            }
            else if(currentName.equalsIgnoreCase("person_village")){
                village=locationService.getVillageByName(currentValue);
                person.setVillage(village);
            }
            else if(currentName.equalsIgnoreCase("cellphone")){
                personContact.setCellPhone(Integer.valueOf(currentValue));
            }
            else if(currentName.equalsIgnoreCase("other_number")){
                personContact.setAlternativeCellphone(Integer.valueOf(currentValue));
            }
            else if(currentName.equalsIgnoreCase("email")){
                personContact.setEmail(currentValue);
            }
            else if(currentName.equalsIgnoreCase("enrollment_number")){
                //
            }
        }
        Date today=new Date();
        person.setDateCreated(today);
        person.setVoided(false);
        personContactSet.add(personContact);
        person.setContacts(personContactSet);
        personService.savePerson(person);
        response.getWriter().print("patient payload successfully processed");
    }
    @RequestMapping(value="/getAllSubCounties.form",method = RequestMethod.GET)
    public void getAllSubCounties(HttpServletRequest request,HttpServletResponse response) throws IOException {
        LocationService locationService=new LocationService();
        List<SubCounty> subCountyList=locationService.getAllSubCounties();
        JSONObject jsonObject=new JSONObject();
        JSONObject subCountyJsonObject;
        JSONArray locationJsonArray=new JSONArray();
        for(SubCounty subCounty:subCountyList){
            subCountyJsonObject=new JSONObject();
            subCountyJsonObject.put("name", subCounty.getName());
            locationJsonArray.add(subCountyJsonObject);
        }
        jsonObject.put("subcounties", locationJsonArray);
        response.getWriter().print(jsonObject);
    }
    @RequestMapping(value="/getAllWards.form",method = RequestMethod.GET)
    public void getAllWards(HttpServletRequest request,HttpServletResponse response) throws IOException {
        LocationService locationService=new LocationService();
        List<Ward> wardList=locationService.getAllWards();
        JSONObject jsonObject=new JSONObject();
        JSONObject wardJsonObject;
        JSONArray wardJsonArray=new JSONArray();
        for(Ward ward:wardList){
            wardJsonObject=new JSONObject();
            wardJsonObject.put("name", ward.getName());
            wardJsonArray.add(wardJsonObject);
        }
        jsonObject.put("wards",wardJsonArray);
        response.getWriter().print(jsonObject);
    }
    @RequestMapping(value="/getAllVillages.form",method = RequestMethod.GET)
    public void getAllVillages(HttpServletRequest request,HttpServletResponse response) throws IOException {
        LocationService locationService=new LocationService();
        List<Village> villageList=locationService.getAllVillages();
        JSONObject jsonObject=new JSONObject();
        JSONObject villageJsonObject;
        JSONArray villageJsonArray=new JSONArray();
        for(Village village:villageList){
            villageJsonObject=new JSONObject();
            villageJsonObject.put("name", village.getName());
            villageJsonArray.add(villageJsonObject);
        }
        jsonObject.put("villages",villageJsonArray);
        response.getWriter().print(jsonObject);
    }
}