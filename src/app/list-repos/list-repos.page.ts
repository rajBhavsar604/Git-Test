import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global/global.service';
import { ApiServiceService } from '../ws/api-service.service';
import { MGetReposResponse } from './list-repos.module';

@Component({
  selector: 'app-list-repos',
  templateUrl: './list-repos.page.html',
  styleUrls: ['./list-repos.page.scss'],
})
export class ListReposPage implements OnInit {
  username: any;
  mGetReposResponse: MGetReposResponse = new MGetReposResponse();
  repositories: any = [];

  constructor(private route: ActivatedRoute, private apiService: ApiServiceService, private global: GlobalService, private router: Router) {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log("this.username", this.username)

    // Api call from the service name apiservice
    this.apiService.getRepos(this.username).toPromise().then(resRepos => {
      if (resRepos) {
        console.log("resRepos", resRepos)
        this.mGetReposResponse = resRepos; // mGetReposResponse added to get filter while search
        this.repositories = resRepos; // repositories added to show in the html view
      } else {
        console.log("error resRepos", resRepos)
      }
    }, error => {
      console.log("resRepos error", error)
      this.global.openToast(error?.error?.message);
    })
  }

  ngOnInit() {
  }

  /**
   * search get input field entered in searchbar
   * @param searchedValue 
   */
  search(searchedValue: any) {
    console.log("searchedValue", searchedValue)
    this.repositories = this.searchReposByRepositoryName(this.mGetReposResponse, searchedValue);
  }

  /**
   * searchReposByProjectName used to search the repositories as per repoName
   * @param repoList 
   * @param name 
   * @returns 
   */
  searchReposByRepositoryName(repoList: any, name: any) {
    var results = [];
    var index;
    var entry;

    name = name.toUpperCase();
    for (index = 0; index < repoList.length; ++index) {
      entry = repoList[index];
      if ((entry && entry.name && entry.name.toUpperCase().indexOf(name) !== -1)) {
        results.push(entry);
      }
    }
    return results;
  }

  selectOtherUser() {
    this.router.navigate(['home'])
  }

}
