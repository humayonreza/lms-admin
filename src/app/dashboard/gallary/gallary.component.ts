import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
// import { MatDialog } from '@angular/material/dialog';
// import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss'],
})
export class GallaryComponent implements OnInit {
  mediaPath: string = '';
  arrContents: any = [];
  arrNavByUser: any = [];
  isSmart: boolean = false;
  title: string = '';
  course_id: any;
  educator_id: any;
  media_type: string = '0';
  media_path: string = '';
  course: string = '';
  search_text: string = '';
  arrCourse: any = [];
  resp: string = '';
  elm: any;
  fileName: string = '';
  fileExt: string = '';
  uploadFile = 'Select File';
  docExtId: number = 0;
  constructor(
    private backendService: BackendService,
    public stateService: StateService,
    public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient // public dialog: MatDialog
  ) {}

  try_or_buy_course() {
    this.router.navigate(['/courses']);
  }

  get_course_list() {
    const data = {
      chCode: 'hg_gt78999@%^&',
      queryId: '1015',
    };
    this.backendService.SubmitQueryAdmin(data).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
        this.arrCourse = resp;
      }
    });
  }

  onFileSelected(event: any) {
    this.elm = event.target;
    console.log(this.elm.files[0]);
    this.fileName = this.elm.files[0].name;
    this.uploadFile = this.elm.files[0].name;
    if (this.elm.files.length > 0) {
      if (this.elm.files[0].type === 'image/jpeg') {
        this.fileExt = '.jpg';
        this.docExtId = 1;
      } else if (this.elm.files[0].type === 'image/png') {
        this.fileExt = '.png';
        this.docExtId = 2;
      } else if (this.elm.files[0].type === 'application/pdf') {
        this.fileExt = '.pdf';
        this.docExtId = 3;
      } else if (this.elm.files[0].type === 'audio/wav') {
        this.fileExt = '.wav';
        this.docExtId = 4;
      } else if (this.elm.files[0].type === 'video/mp4') {
        this.fileExt = '.mp4';
        this.docExtId = 5;
      } else {
        this.fileExt = '.docx';
        this.docExtId = 6;
      }
    }
    console.log('File Type :', this.docExtId);
  }

  add_gallary_item(data: any) {
    console.log(data);
    let params = {
      media_id: this.stateService.generate_timestamp_id(),
      media_type: data.media_type,
      course_id: data.course_id,
      title: data.title,
      fileExt: this.fileExt,
      chCode: 'hg_gt78999@%^&',
      queryId: '1016',
    };
    console.log('Params : ', params);
    this.backendService.SubmitQueryAdmin(params).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
        this.upload_image(params.media_id, params.course_id, params.media_type);
      }
    });
  }
  arrMediaList: any = [];

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
        console.log('Media List : ', resp);
        for (let i = 0; i < resp.length; i++) {
          let dx = {
            media_id: resp[i].media_id,
            media_type: resp[i].media_type,
            course_id: resp[i].course_id,
            media_path:
              resp[i].media_type == 1
                ? this.mediaPath + resp[i].media_path
                : '',
            title: resp[i].media_id,
          };
          this.arrMediaList.push(dx);
        }
      }
    });
  }

  upload_image(mediaId: number, mediaFolder: string, media_type: number) {
    console.log(mediaId);
    let mediaData = new FormData();
    let mediaContent = mediaId + '-' + this.docExtId + '-' + mediaFolder;
    mediaData.append('file', this.elm.files[0], mediaContent);
    console.log('File Name @bes: ', mediaContent);
    this.http
      .post(
        this.backendService.mediaPath + 'media_upload_script.php',
        mediaData
      )
      .subscribe((resp) => {
        if (resp) {
          console.log('Upload Successful...');
        } else {
          console.log('Upload Successful.');
        }
      });
    this.fetch_media_list(mediaFolder);
  }

  ngOnInit(): void {
    this.isSmart = screen.width < 500 ? true : false;
    this.mediaPath = this.backendService.mediaPath;
    this.route.queryParamMap.subscribe((params) => {
      this.course_id = params.get('id');
      this.educator_id = params.get('educator_id');
      this.fetch_media_list(this.course_id);
    });
  }
}
