import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: any;
  constructor(private router: Router, private toastController: ToastController, private global: GlobalService) { }

  ionViewWillEnter() {
    this.username = ''
  }

  /**
   * repos function used to pass username to list-repos page and get list of repositories
   */
  async repos() {
    console.log(this.username)
    if (this.username == '' || this.username == undefined) {
      this.global.openToast('Username should not be blank!')
    } else {
      this.router.navigate(["list-repos", { username: this.username }])
    }
  }
}
