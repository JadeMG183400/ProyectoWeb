import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService{
  private REST_API_SERVER = "http://localhost:3000/"
  private host  = 'http://localhost:3000/';
  private apiUrl = this.host + '/api/v1/';
  constructor(private http: HttpClient ) { }

  public getProduct(nameEndPoint : String) {

  }

  login(item): Observable<any> {
    return this.http
      .post(`${this.host}/api/v1/login/`, item);
  }

  getUser(id): Observable<any> {
    return this.http
      .get(`${this.host}/api/v1/getUser/`+ id, this.getOptions());
  }
  getUsers(): Observable<any> {
    return this.http
      .get(`${this.host}/api/v1/getAllUsers/`, this.getOptions())
  }
  updateUser(item, id): Observable<any> {
    return this.http
      .put(`${this.host}/api/v1/updateUser/`+ id, item , this.getOptions());
  }
  deleteUser( id): Observable<any> {
    return this.http
      .delete(`${this.host}/api/v1/deleteUser/`+ id, this.getOptions());
  }
  registry(item): Observable<any> {
    return this.http
      .post(`${this.apiUrl}register`, item);
  }

  getOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
			params:{

			}
    };
    return httpOptions;
  }

}
