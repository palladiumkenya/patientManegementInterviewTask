import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Enrollment } from './enrollment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Enrollment>;

@Injectable()
export class EnrollmentService {

    private resourceUrl =  SERVER_API_URL + 'api/enrollments';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/enrollments';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(enrollment: Enrollment): Observable<EntityResponseType> {
        const copy = this.convert(enrollment);
        return this.http.post<Enrollment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(enrollment: Enrollment): Observable<EntityResponseType> {
        const copy = this.convert(enrollment);
        return this.http.put<Enrollment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Enrollment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Enrollment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Enrollment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Enrollment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Enrollment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Enrollment[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Enrollment[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Enrollment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Enrollment[]>): HttpResponse<Enrollment[]> {
        const jsonResponse: Enrollment[] = res.body;
        const body: Enrollment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Enrollment.
     */
    private convertItemFromServer(enrollment: Enrollment): Enrollment {
        const copy: Enrollment = Object.assign({}, enrollment);
        copy.enrollmentDate = this.dateUtils
            .convertLocalDateFromServer(enrollment.enrollmentDate);
        return copy;
    }

    /**
     * Convert a Enrollment to a JSON which can be sent to the server.
     */
    private convert(enrollment: Enrollment): Enrollment {
        const copy: Enrollment = Object.assign({}, enrollment);
        copy.enrollmentDate = this.dateUtils
            .convertLocalDateToServer(enrollment.enrollmentDate);
        return copy;
    }
}
