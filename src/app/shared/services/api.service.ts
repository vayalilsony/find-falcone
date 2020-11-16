import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  /**
   * @description Function for setting the api headers
   */
  private getHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json').append('Accept', 'application/json');
    return headers;
  }

  /**
   * @description Execute the get method
   * @param apiUrl apiUrl url of the api to be called
   * @param successCallback successCallback succes callback for the api call function
   * @param failureCallback failureCallback failure callback for the api call function
   */
  public ExecuteGet(apiUrl, successCallback, failureCallback): void {
    this.http.get(apiUrl, { headers: this.getHeader() }).subscribe(response => {
      successCallback(response);
    }, error => {
      failureCallback(error);
    });
  }

  /**
   * @description Execute the post method
   * @param apiUrl apiUrl url of the api to be called
   * @param successCallback successCallback succes callback for the api call function
   * @param failureCallback failureCallback failure callback for the api call function
   */

  public ExecutePost(apiUrl, requestBody, successCallback, failureCallback): void {
    this.http.post(apiUrl, requestBody, { headers: this.getHeader() }).subscribe(response => {
      successCallback(response);
    }, error => {
      failureCallback(error);
    });
  }
}
