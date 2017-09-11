import { Injectable } from '@angular/core';
import { IConnection } from 'mysql';
@Injectable()
export class HisService {

  constructor() { }

  getPatient(conn: IConnection,hn: string){

  }

  getPatients(conn: IConnection){
        let sqlPatient: string = sessionStorage.getItem('sqlPatient');
        return new Promise((resolve, reject) => {
            conn.query(sqlPatient, [], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
  }

}
