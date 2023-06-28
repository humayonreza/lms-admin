import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resp } from './interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  // scriptPath: string = 'http://localhost/backendRTO/scripts/';
  // mediaPath: string = 'http://localhost/backendRTO/medias/';

  scriptPath: string = 'https://trainedup.com.au/backendRTO/scripts/';
  mediaPath: string = 'https://trainedup.com.au/backendRTO/medias/';

  // scriptPath: string = 'https://smartsoln.org/backendRTO/scripts/';
  // mediaPath: string = 'https://smartsoln.org/backendRTO/medias/';

  // imgPath: string = 'https://smartsoln.org/backendRTO/images/';
  // videoPath: string = 'https://smartsoln.org/backendRTO/medias/';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  SubmitQuery(data: any): Observable<Resp[]> {
    return this.http.post<Resp[]>(this.scriptPath + 'upload.php', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      }),
    });
  }

  SubmitQueryAdmin(data: any): Observable<Resp[]> {
    return this.http.post<Resp[]>(
      this.scriptPath + 'backend_service_admin.php',
      data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        }),
      }
    );
  }

  SubmitQueryStudent(data: any): Observable<Resp[]> {
    return this.http.post<Resp[]>(
      this.scriptPath + 'backend_service_student.php',
      data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        }),
      }
    );
  }

  SubmitQueryCms(data: any): Observable<Resp[]> {
    return this.http.post<Resp[]>(
      this.scriptPath + 'backend_service_cms.php',
      data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        }),
      }
    );
  }

  request_session_for_stripe_card_process(data: any): Observable<Resp[]> {
    const _file = 'stripe_confirm_card_pay_process.php';
    return this.http.post<Resp[]>(this.scriptPath + _file, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      }),
    });
  }

  requset_session_google_apple_pay_process(data: any): Observable<Resp[]> {
    const _file =
      data.PlanId == '1'
        ? 'stripe_checkout_one_off_process.php'
        : 'stripe_checkout_subscription_process.php';
    return this.http.post<Resp[]>(this.scriptPath + _file, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      }),
    });
  }

  // upload_media(file: File) {
  //   console.log(file);
  //   return this.http.post<Resp[]>(
  //     this.imgPath + 'audio_upload_script.php',
  //     file,
  //     {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json,wav',
  //         FileName: file.name,
  //       }),
  //     }
  //   );
  // }

  openSnackBar(message: string, action: string, {}) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['bg-snackbar'],
    });
  }
}
