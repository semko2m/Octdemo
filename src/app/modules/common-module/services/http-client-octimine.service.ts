import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class HttpClientOctimineService {
  private REST_API_SERVER = "http://localhost:3000";

  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  constructor(private httpClient: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  /**
   * Parse link header and extract pagination values
   * @param header
   */
  parseLinkHeader(header: string) {
    if (header.length == 0) {
      return;
    }
    let parts = header.split(',');
    let links: any = {};
    parts.forEach(p => {
      let section = p.split(';');
      let url = section[0].replace(/<(.*)>/, '$1').trim();
      let name = section[1].replace(/rel="(.*)"/, '$1').trim();
      url = url.replace(this.REST_API_SERVER, '')
      url = url.substring(url.indexOf('?') + 1)
      links[name] = '?' + url;
    });

    this.first = links["first"];
    this.last = links["last"];
    this.prev = links["prev"];
    this.next = links["next"];
  }

  /**
   * Get function. Calls httpClient from angular. Returns Obseravalble. Wrapped for central settings
   * @param url
   * @param pagination
   */
  public get(url: string, pagination = true) {
    let options: any;
    const urlString = this.REST_API_SERVER + url;
    if (pagination) {
      options = {params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response"};
    } else {
      options = {observe: "response"};
    }
    return this.httpClient.get(urlString, options).pipe(retry(3), catchError(this.handleError), tap(res => {
      // @ts-ignore
      console.log(res.headers.get('Link'));
      // @ts-ignore
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  /**
   * Send post to the backend
   * @param url
   * @param data
   */
  public post(url: string, data: any) {
    const urlString = this.REST_API_SERVER + url;
    let options:any = {observe: "response"};
    return this.httpClient.post(urlString,  data, options).pipe(retry(3), catchError(this.handleError));
  }

  /**
   * Delete http
   * @param url
   */
  public delete(url: string) {
    const urlString = this.REST_API_SERVER + url;
    let options:any = {observe: "response"};
    return this.httpClient.delete(urlString,options).pipe(retry(3), catchError(this.handleError));
  }

  /**
   * Send put to the backend
   * @param url
   * @param data
   */
  public put(url: string, data: any) {
    const urlString = this.REST_API_SERVER + url;
    let options:any = {observe: "response"};
    return this.httpClient.put(urlString,  data, options).pipe(retry(3), catchError(this.handleError));
  }
}
