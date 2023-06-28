import { Injectable } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
// import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';

  constructor() {}

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    this.previewImage = event.imageAsDataUrl;
    console.log('Image Blob Data :', this.previewImage);
    this.btnLabel = 'Recapture image';
  }
  checkPermissions() {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 50,
          height: 30,
        },
      })
      .then((res) => {
        console.log('response', res);
        this.stream = res;
        this.status = 'My camera is accessing';
        this.btnLabel = 'Capture image';
      })
      .catch((err) => {
        console.log(err);
        if (err?.message === 'Permission denied') {
          this.status =
            'Permission denied please try again by approving the access';
        } else {
          this.status =
            'You may not having camera system, Please try again ...';
        }
      });
  }

  captureImage() {
    this.trigger.next();
  }

  proceed() {
    console.log(this.previewImage);
  }

  start(val: number) {
    console.log(val);
    this.captureImage();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.trigger.closed;
    console.log('ngOnDestroy completed');
  }
}
