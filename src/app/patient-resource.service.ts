import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import {Headers, RequestOptions, Http } from '@angular/http';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PatientResourceService {
  public baseUrl = 'http://localhost:8010/';

  constructor(private _http: Http) { }
  // Add Cohorts
  public createPatient(payload): Observable<any> {

    if (!payload) {
      return null;
    }

    const addCreatPatientUrl: string = this.baseUrl + 'save-patient-data';

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(addCreatPatientUrl, JSON.stringify(payload), options)
      .map((response: Response) => {
        return response.json();
      });

  }
  public createNextOfKin(patientId, payload): Observable<any> {

    if (!payload) {
      return null;
    }

    const addCreatPatientUrl: string = this.baseUrl + 'save-next-of-kin-data/' + patientId;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(addCreatPatientUrl, JSON.stringify(payload), options)
      .map((response: Response) => {
        return response.json();
      });

  }

  public updateContacts(personId, payload): Observable<any> {

    if (!payload) {
      return null;
    }

    const addUpdateContactsUrl: string = this.baseUrl + 'update-contacts/' + personId;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(addUpdateContactsUrl, JSON.stringify(payload), options)
      .map((response: Response) => {
        return response.json();
      });

  }
  public searchPatient(searchText: string):
  Observable<any> {

    const url = this.baseUrl + 'patient';
    const params: URLSearchParams = new URLSearchParams();

     params.set('person_id', searchText);
     params.set('name', searchText);


    return this._http.get(url, {
      search: params
    })
      .map((response: Response) => {
        return response.json();
      });
  }

  public getPatientsByAgeCohort(start, end):
  Observable<any> {

    const url = this.baseUrl + 'patient-by-age-cohorts';
    const params: URLSearchParams = new URLSearchParams();

    params.set('startAge', start);
    params.set('endAge', end);


    return this._http.get(url, {
      search: params
    })
      .map((response: Response) => {
        return response.json();
      });
  }

  public getPatientById(personId: string): Observable<any> {

    const url = this.baseUrl + 'patient-data/' + personId;
    const params: URLSearchParams = new URLSearchParams();


    return this._http.get(url, {
      search: params
    })
      .map((response: Response) => {
        return response.json();
      });
  }

  public getPatientNextOfKinList(patientId: string): Observable<any> {

    const url = this.baseUrl + 'patient-next-of-kin-list/' + patientId;
    const params: URLSearchParams = new URLSearchParams();


    return this._http.get(url, {
      search: params
    })
      .map((response: Response) => {
        return response.json();
      });
  }
  public getAllPatients(): Observable<any> {

    const url = this.baseUrl + 'patient-all-patients';
    const params: URLSearchParams = new URLSearchParams();


    return this._http.get(url, {
      search: params
    })
      .map((response: Response) => {
        return response.json();
      });
  }
  public updateLocation(personId, payload): Observable<any> {

    if (!payload) {
      return null;
    }

    const addUpdateContactsUrl: string = this.baseUrl + 'update-location/' + personId;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(addUpdateContactsUrl, JSON.stringify(payload), options)
      .map((response: Response) => {
        return response.json();
      });

  }

  public updatePerson(personId, payload): Observable<any> {

    if (!payload) {
      return null;
    }

    const addUpdateContactsUrl: string = this.baseUrl + 'update-person/' + personId;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(addUpdateContactsUrl, JSON.stringify(payload), options)
      .map((response: Response) => {
        return response.json();
      });

  }
  public voidPatient(paatientId) {
    let url = this.baseUrl + 'void-patient';
    url += '/' + paatientId ;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url, options)
      .map(( response) => {
        return response;
      });

  }
  public getVoidedPatients(): Observable<any> {

    const url = this.baseUrl + 'list-of-voided-patients';
    const params: URLSearchParams = new URLSearchParams();


    return this._http.get(url, {
      search: params
    })
      .map((response: Response) => {
        return response.json();
      });
  }
  public enrollNextOfKinAsPatient(personId, payload): Observable<any> {

    if (!payload) {
      return null;
    }

    const addCreatPatientUrl: string = this.baseUrl + 'enroll-next-of-kin-as-patient/' + personId;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(addCreatPatientUrl, JSON.stringify(payload), options)
      .map((response: Response) => {
        return response.json();
      });

  }

}
