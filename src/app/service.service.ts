import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ServiceService{
  private REST_API_SERVER = "http://localhost:3000/"

  constructor(private httpclient : HttpClient ) { }

  public getProduct(nameEndPoint : String) {

  }
}
