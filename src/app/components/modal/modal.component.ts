import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  returnStr: number = 0;
  arr: any = [];
  arrMediaList: any = [];
  mediaPath: string = '';
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  setinfo() {
    console.log('Param2 @ modal ', this.data.payload);
    this.arr = this.data.payload;
    if (this.arr) {
      this.fetch_media_list(this.arr.course_id);
    }
  }

  update_question(ques_id: string, editText: string, option_id: string) {
    console.log(ques_id + ' - ' + editText + ' - ' + option_id);
    let params = {
      question_id: ques_id,
      option_id: option_id,
      editText: editText,
      chCode: 'hg_gt78999@%^&',
      queryId: '1013',
    };
    this.backendService.SubmitQueryAdmin(params).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
      }
    });
  }

  fetch_media_list(course_id: string) {
    this.arrMediaList = [];
    let params = {
      course_id: course_id,
      chCode: 'hg_gt78999@%^&',
      queryId: '1017',
    };
    console.log('Params : ', params);
    this.backendService.SubmitQueryAdmin(params).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
        // this.arrMediaList = resp;
        for (let i = 0; i < resp.length; i++) {
          let dx = {
            media_id: resp[i].media_id,
            media_type: resp[i].media_type,
            course_id: resp[i].course_id,
            media_path:
              resp[i].media_type == 1
                ? this.mediaPath + resp[i].media_path
                : '',
            title: resp[i].title,
          };
          this.arrMediaList.push(dx);
        }
        console.log('Media List@Modal :', this.arrMediaList);
      }
    });
  }

  //
  ngOnInit(): void {
    this.mediaPath = this.backendService.mediaPath;
    this.setinfo();
  }
}
