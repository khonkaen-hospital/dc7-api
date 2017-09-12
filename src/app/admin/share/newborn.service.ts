import { Injectable } from '@angular/core';
import { IConnection } from 'mysql';
import { Http,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class NewbornService {

  constructor( private http: Http) { }

  registerPatient(data: any) {
    let apiUrl =  localStorage.getItem('apiUrl');
    let accessToken =  localStorage.getItem('accessToken');
    return new Promise((resolve, reject) => {
      this.http.post(`${apiUrl}/v1/patients?access-token=${accessToken}`, data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
