import * as mysql from 'mysql';
import { IConnection, IConnectionConfig } from 'mysql';
import { AlertService } from './alert.service';
const alertService = new AlertService();

export class Configure {
  getConnection() {
    return new Promise((resolve, reject) => {
      
      const config: IConnectionConfig = {
        host: localStorage.getItem('host'),
        port: +localStorage.getItem('port'),
        database: localStorage.getItem('databaseName'),
        user: localStorage.getItem('username'),
        password: localStorage.getItem('password')
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
