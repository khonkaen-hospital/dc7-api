import * as mysql from 'mysql';
import { IConnection, IConnectionConfig } from 'mysql';
import { AlertService } from './alert.service';
const alertService = new AlertService();

export class Configure {
  getConnection() {
    return new Promise((resolve, reject) => {
      
      const config: IConnectionConfig = {
        host: sessionStorage.getItem('host'),
        port: +sessionStorage.getItem('port'),
        database: sessionStorage.getItem('databaseName'),
        user: sessionStorage.getItem('username'),
        password: sessionStorage.getItem('password')
      };

      const pool = mysql.createPool(config);

      pool.getConnection((err, connection: IConnection) => {
        if (err) {
          console.log(err);
          alertService.error(JSON.stringify(err.message));
          connection.destroy();
          reject(err);
        } else {
          resolve(connection);
        }
      });

      pool.on('connection', (connection) => {
        connection.query('SET NAMES utf8')
      });
    });
  }
}
