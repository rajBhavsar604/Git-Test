import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private toastController: ToastController) { }

  static apiUrl = 'https://api.github.com/users/'
  static repos = '/repos'

  /**
   * ErrorHandler used to handle HttpErrorResponse of the api.
   */
  static ErrorHandler = {
    handleError(operation: string) {
      return (err: any) => {
        const errMsg = `error in ${operation}() retrieving `;
        console.log(`${errMsg}:`, err);
        if (err instanceof HttpErrorResponse) {
          console.log(`status: ${err.status}, ${err.statusText}`);
        }
        console.log('error ::: ' + JSON.stringify(err));
        return throwError(err);
      };
    }
  };

  /**
   * openToast used to open a toast message if error
   * @param msg 
   */
  async openToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'dark',
      duration: 2000
    });
    toast.present();
  }
}
