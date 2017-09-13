import { NewbornService } from './../share/newborn.service';
import { HisService } from './../share/his.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

import { IConnection } from 'mysql';
import { Configure } from '../../configure';
import { Http,URLSearchParams } from '@angular/http';

import * as moment from 'moment';

@Component({
  selector: 'app-newborn',
  templateUrl: './newborn.component.html',
  styleUrls: ['./newborn.component.css']
})
export class NewbornComponent implements OnInit {
  
  configure: Configure = new Configure();
  connection: IConnection;
  patients: Array<any> = [];
  loading: boolean;
  pid: string;

  constructor(
    private ref: ChangeDetectorRef,
    private alertService: AlertService,
    private hisService: HisService,
    private newbornService: NewbornService
  ) { }

  ngOnInit() {
    this.configure.getConnection()
    .then((conn: IConnection) => {
        this.connection = conn;
        console.log('execute success');
        this.getPatients();
    })
  }

  getPatients(){
    this.loading = true;
    this.hisService.getPatients(this.connection)
  .then((result: any) => {
      this.patients = result;
      this.connection.destroy();
      this.loading = false;
      this.ref.detectChanges();
  })
  .catch(err => {
      this.loading = false;
      this.connection.destroy();
      this.alertService.error(JSON.stringify(err));
  });
  }


  registerPatient(data: any){
    this.loading = true;
    let body = new URLSearchParams();
    for(let d in data){
      if(data[d] instanceof Date){
        body.set(d, moment( data[d]).format('YYYY-MM-DD'));
      }else{
        body.set(d, data[d]);
      }
     };
    this.newbornService.registerPatient(body)
    .then((token: string) => {
      this.alertService.success('ลงทะเบียนข้อมูลเสร็จเรียบร้อย');
      this.loading = false;
    }).catch((error) => {
      this.alertService.error(JSON.stringify(error));
      this.loading = false;
    })
  }

}
