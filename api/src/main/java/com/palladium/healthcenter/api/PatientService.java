package com.palladium.healthcenter.api;

import com.palladium.healthcenter.Patient;
import com.palladium.healthcenter.api.hibernate.HibernatePatientDAO;

import java.io.IOException;
import java.util.List;

public class PatientService {
    HibernatePatientDAO patientDAO=new HibernatePatientDAO();
    public List<Patient> getAllPatients() throws IOException {
        return patientDAO.getAllPatients();
    }
    public Patient savePatient(Patient patient) throws IOException{
        return patientDAO.savePatient(patient);
    }
}