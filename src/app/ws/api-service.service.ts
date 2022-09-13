import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from '../global/global.service';
import { MGetReposResponse } from '../list-repos/list-repos.module';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpClient: HttpClient) { }

  /**
   * getRepos created a function to call getRepositories api in service
   * @param username 
   * @returns 
   */
  getRepos(username: any): Observable<MGetReposResponse> {
    console.log("getRepos for username", username)
    return this.httpClient.get<MGetReposResponse>(GlobalService.apiUrl + username + GlobalService.repos).pipe(
      map(response => {
        console.log("getRepos response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
