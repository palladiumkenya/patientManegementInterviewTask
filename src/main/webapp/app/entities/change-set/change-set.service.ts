import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ChangeSet } from './change-set.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChangeSet>;

@Injectable()
export class ChangeSetService {

    private resourceUrl =  SERVER_API_URL + 'api/change-sets';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/change-sets';

    constructor(private http: HttpClient) { }

    create(changeSet: ChangeSet): Observable<EntityResponseType> {
        const copy = this.convert(changeSet);
        return this.http.post<ChangeSet>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(changeSet: ChangeSet): Observable<EntityResponseType> {
        const copy = this.convert(changeSet);
        return this.http.put<ChangeSet>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChangeSet>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChangeSet[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChangeSet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChangeSet[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ChangeSet[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChangeSet[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChangeSet[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChangeSet = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChangeSet[]>): HttpResponse<ChangeSet[]> {
        const jsonResponse: ChangeSet[] = res.body;
        const body: ChangeSet[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChangeSet.
     */
    private convertItemFromServer(changeSet: ChangeSet): ChangeSet {
        const copy: ChangeSet = Object.assign({}, changeSet);
        return copy;
    }

    /**
     * Convert a ChangeSet to a JSON which can be sent to the server.
     */
    private convert(changeSet: ChangeSet): ChangeSet {
        const copy: ChangeSet = Object.assign({}, changeSet);
        return copy;
    }
}
