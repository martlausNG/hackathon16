/**
 * Created by mart on 17.12.16.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ApiService {

  constructor(private http: Http) {
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  private createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer WTD5ZRPJUNRQHOSWEPBQDUQ5AFBN3NDD');
  }
}
