import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { NextOfKin } from './next-of-kin.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NextOfKin>;

@Injectable()
export class NextOfKinService {

    private resourceUrl =  SERVER_API_URL + 'api/next-of-kins';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/next-of-kins';

    constructor(private http: HttpClient) { }

    create(nextOfKin: NextOfKin): Observable<EntityResponseType> {
        const copy = this.convert(nextOfKin);
        return this.http.post<NextOfKin>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(nextOfKin: NextOfKin): Observable<EntityResponseType> {
        const copy = this.convert(nextOfKin);
        return this.http.put<NextOfKin>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<NextOfKin>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NextOfKin[]>> {
        const options = createRequestOption(req);
        return this.http.get<NextOfKin[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NextOfKin[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<NextOfKin[]>> {
        const options = createRequestOption(req);
        return this.http.get<NextOfKin[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NextOfKin[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NextOfKin = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NextOfKin[]>): HttpResponse<NextOfKin[]> {
        const jsonResponse: NextOfKin[] = res.body;
        const body: NextOfKin[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NextOfKin.
     */
    private convertItemFromServer(nextOfKin: NextOfKin): NextOfKin {
        const copy: NextOfKin = Object.assign({}, nextOfKin);
        return copy;
    }

    /**
     * Convert a NextOfKin to a JSON which can be sent to the server.
     */
    private convert(nextOfKin: NextOfKin): NextOfKin {
        const copy: NextOfKin = Object.assign({}, nextOfKin);
        return copy;
    }
}
