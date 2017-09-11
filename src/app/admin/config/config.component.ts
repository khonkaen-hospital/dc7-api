import { AlertService } from './../../alert.service';
import { Component, OnInit } from '@angular/core';
import { IConnection } from 'mysql';
import { Configure } from '../../configure';
const { ipcRenderer } = require('electron');

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  configure: Configure = new Configure();
  connection: IConnection;
  loading: boolean;

  public host: string;
  public dirverItems: Array<any> = [
    { id: 'mysql', name : 'MySQL/MariaDB'},
    { id: 'pg', name : 'PostgreSQL'},
    { id: 'oracledb', name : 'Oracle'},
    { id: 'mssql', name : 'MSSQL'},
  ];
  public driver: string;
  public username: string;
  public password: string;
  public databaseName: string;
  public port: string;

  public sqlPatient: string;
  public sqlVisit: string;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.host = localStorage.getItem('host');
    this.host = localStorage.getItem('host');
    this.driver = localStorage.getItem('driver');
    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');
    this.databaseName = localStorage.getItem('databaseName');
    this.port = localStorage.getItem('port') || '3306';
    this.sqlPatient = localStorage.getItem('sqlPatient');
    this.sqlVisit = localStorage.getItem('sqlVisit');
  }

  save(){
    localStorage.setItem('driver', this.driver);
    localStorage.setItem('host', this.host);
    localStorage.setItem('username', this.username);
    localStorage.setItem('password', this.password);
    localStorage.setItem('databaseName', this.databaseName);
    localStorage.setItem('port', this.port);
    this.alertService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว..');
    ipcRenderer.send('close-app');
  }

  saveSql(){
    sessionStorage.setItem('sqlPatient', this.sqlPatient);
    sessionStorage.setItem('sqlVisit', this.sqlVisit);
    this.alertService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว..');
  }

  testConnection(){
    this.save();
    this.configure.getConnection()
    .then((conn: IConnection) => {
        this.connection = conn;
        this.alertService.success('Connection Successs..');
        this.loading = false;
    })
    .catch(err => {
      this.loading = false;
      this.connection.destroy();
      this.alertService.error(JSON.stringify(err));
  });
  }

}
