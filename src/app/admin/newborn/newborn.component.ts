import { HisService } from './../share/his.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

import { IConnection } from 'mysql';
import { Configure } from '../../configure';

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

  constructor(
    private ref: ChangeDetectorRef,
    private alertService: AlertService,
    private hisService: HisService
  ) { }

  ngOnInit() {
    this.configure.getConnection()
    .then((conn: IConnection) => {
        this.connection = conn;
        console.log('success');
        this.getPatients();
    })
  }

  getPatients(){
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

}
