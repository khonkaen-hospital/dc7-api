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
  tab1: boolean;
  tab2: boolean;
  tab3: boolean;

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
  public accessToken: string;
  public apiUrl: string;

  public hosxpSql = `SELECT
	p.hcode as hospcode,
	p.hn as pid,
	p.pname as prename,
	p.fname as name,
	p.lname as lname,
	p.cid,
	p.birthday as birth,
	p.sex,
	p.addrpart as add_houseno,
	p.moopart as add_village,
	p.road as add_road,
	p.addr_soi as add_soimain,
	p.po_code as add_zip,
	concat(p.mobile_phone_number,' ',p.hometel) as add_mobile,
	p.chwpart as changwat,
	p.amppart as ampur,
	p.tmbpart as tambon,
	concat(p.mathername,' ',p.motherlname) as mother_name,
	p.mother_cid as mother,
	concat(p.fatherlname,' ',p.fatherlname) as father_name,
	p.father_cid as father
FROM
	ipt_newborn n
INNER JOIN ipt ON n.an = ipt.an
INNER JOIN patient p ON ipt.hn = p.hn`;

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
    this.sqlPatient = localStorage.getItem('sqlPatient') || this.hosxpSql;
    this.sqlVisit = localStorage.getItem('sqlVisit');

    this.apiUrl = localStorage.getItem('apiUrl') || 'http://dc7.healtharea.net/api';
    this.accessToken = localStorage.getItem('accessToken');
    sessionStorage.setItem('token', localStorage.getItem('accessToken'));
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
    localStorage.setItem('sqlPatient', this.sqlPatient);
    localStorage.setItem('sqlVisit', this.sqlVisit);
    this.alertService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว..');
  }

  saveNewbornApi(){
    localStorage.setItem('apiUrl', this.apiUrl);
    localStorage.setItem('accessToken', this.accessToken);
    sessionStorage.setItem('token',localStorage.getItem('accessToken'));
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

  loadSqlDefault()
  {
    this.sqlPatient = this.hosxpSql;
  }

}
