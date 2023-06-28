import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.component.html',
  styleUrls: ['./questionbank.component.scss'],
})
export class QuestionbankComponent implements OnInit {
  imgPath: string = '';
  isSmart: boolean = false;
  resp: string = '';
  txtCompletion: string = 'Incomplete';
  module_id: string = '0';
  course_id: any;
  educator_id: any;
  question_type: number = -1;
  question_id: number = 0;
  arrCourses: any = [];
  arrContents: any = [];
  arrNavByUser: any = [];
  arrQuesByModule: any = [];
  isListView: boolean = false;
  isAddQuestion: boolean = false;
  txtAddQues: string = '';
  selectedCourseId: string = '';
  selectedModuleId: string = '';
  selectedQuesType: number = 0;
  questionTxt: string = '';
  questionAns: string = '';
  quesParamObj: any = {};
  question_text: string = '';
  option_text: string = '';
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  mul_ans_fb: number = 0;
  is_mul_fb: boolean = false;
  notes: string = '';
  file: any;
  option_resp: string = '';
  arrSavedQues: any = [];
  arrOptionMCTF: any = [];
  elm: any;
  fileName: string = '';
  fileExt: string = '';
  uploadFile: string = '';
  docExtId: number = 0;
  arrQuesByQuery: any = [];
  @Input() arrContent: any = {};
  constructor(
    private backendService: BackendService,
    public stateService: StateService,
    public dataService: DataService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router
  ) {}

  add_question_by_course_by_module(data: any, course_id: string) {
    this.isListView = false;
    this.isAddQuestion = true;
    this.arrOptionMCTF = [];
    this.arrSavedQues = [];
    this.selectedQuesType = parseInt(data.question_type);
    this.quesParamObj = {
      course_id: course_id,
      module_id: data.module_id,
      question_type: data.question_type,
    };
    let txtQuesType =
      data.question_type == '0'
        ? 'T/F'
        : data.question_type == '1'
        ? 'Multiple Choice'
        : data.question_type == '2'
        ? 'Fill-in the Blanks'
        : data.question_type == '3'
        ? 'Verbal Assessment'
        : data.question_type == '4'
        ? 'Short Question'
        : '';

    this.txtAddQues =
      'Add ' +
      txtQuesType +
      ' for Course ' +
      course_id +
      ' in Module ' +
      data.module_id;
    // ======================
  }

  set_multiple_fb(val: boolean) {
    this.is_mul_fb = val;
  }

  create_question(data: any) {
    this.arrSavedQues = [];
    let params = {
      course_id: this.quesParamObj.course_id,
      module_id: this.quesParamObj.module_id,
      question_type: this.quesParamObj.question_type,
      question_text: data.question_text,
      link: '',
      category: this.quesParamObj.question_type,
      answer:
        this.is_mul_fb && this.quesParamObj.question_type == 2
          ? data.answer1 + ' ' + data.answer2
          : this.quesParamObj.question_type == 3
          ? data.answer3
          : this.quesParamObj.question_type == 4
          ? data.answer4
          : data.answer1,
      mul_ans_fb: this.is_mul_fb ? 1 : 0,
      explanation: 'NA',
      notes: data.notes == '' ? 'NA' : data.notes,
      chCode: 'hg_gt78999@%^&',
      queryId: '1007',
    };
    console.log(params);
    this.backendService.SubmitQueryAdmin(params).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log('Data : ', resp);
        this.question_id = resp.question_id;
        let res = {
          question_id: resp.question_id,
          question_text: params.question_text,
          answer: params.answer,
        };
        this.arrSavedQues.push(res);
      }

      if (this.quesParamObj.question_type == 4) {
        this.upload_media(resp.question_id, params.course_id);
      }
    });
  }

  save_option_by_question_id(option_text: string, option_id: string) {
    let param = {
      question_id: this.question_id,
      option_text: option_text,
      option_id: option_id,
      is_selected: 0,
      chCode: 'hg_gt78999@%^&',
      queryId: '1008',
    };
    console.log(param);
    this.backendService.SubmitQueryAdmin(param).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log('Data : ', resp);
        this.option_resp = resp.Msg;
        let data = {
          question_id: this.question_id,
          option_text: option_text,
          option_id: option_id,
          resp: resp.Msg,
        };
        this.arrOptionMCTF.push(data);
      }
    });
  }

  // answer category course_id explanation link module_id mul_ans_fb notes options question_id question_text

  update_question(data: any) {
    let params = {
      question_id: data.question_id,
      question_text: data.question_text,
      answer: data.answer,
      course_id: data.course_id,
      module_id: data.module_id,
      chCode: 'hg_gt78999@%^&',
      queryId: '1013',
    };
    console.log(data);
    this.backendService.SubmitQueryAdmin(params).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log('Data : ', resp);
        if (data.category == 0 || data.category == 1) {
          for (let i = 0; i < data.options.length; i++) {
            let paramload = {
              ser: data.options[i].ser,
              question_id: data.options[i].question_id,
              option_id: data.options[i].option_id,
              option_text: data.options[i].option_text,
              chCode: 'hg_gt78999@%^&',
              queryId: '1014',
            };
            console.log(paramload);
            this.update_option_by_question_id(paramload);
          }
        }
      }
    });
  }

  update_option_by_question_id(paramload: any) {
    this.backendService.SubmitQueryAdmin(paramload).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
      }
    });
  }

  ques_list_by_param(
    course_id: string,
    module_id: string,
    question_type: number
  ) {
    this.isListView = true;
    this.isAddQuestion = false;
    let data = {
      course_id,
      module_id,
      question_type,
      chCode: 'hg_gt78999@%^&',
      queryId: '1006',
    };
    console.log(data);
    this.backendService.SubmitQueryAdmin(data).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log('Data : ', resp);
        this.arrQuesByQuery = resp;
      }
    });
  }

  fetch_question_summary(course_id: string) {
    let data = {
      course_id,
      chCode: 'hg_gt78999@%^&',
      queryId: '1005',
    };
    console.log(data);
    this.backendService.SubmitQueryAdmin(data).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        if (resp.length > 0) {
          console.log('Summary : ', resp);
          this.arrCourses = resp;
        } else {
          console.log('No such course available');
        }
      }
    });
  }

  fetch_module_list_by_course() {
    let data = {
      chCode: 'hg_gt78999@%^&',
      queryId: '1009',
    };
    console.log(data);
    this.backendService.SubmitQueryAdmin(data).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log('arrCourses : ', resp);
        this.arrCourses = resp;
      }
    });
  }

  back_to_home() {
    this.router.navigate(['/']);
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
    //
    console.log('File Type :', this.docExtId);
  }

  upload_media(mediaId: string, imgFolder: string) {
    console.log(mediaId);
    let mediaData = new FormData();
    let mediaContent = mediaId + '-' + this.docExtId + '-' + imgFolder;
    mediaData.append('file', this.elm.files[0], mediaContent);
    console.log('File Name @bes: ', mediaContent);
    this.http
      .post(
        this.backendService.mediaPath +
          'videos/courses/' +
          // this.arrContent[0].course_id +
          // '/' +
          'video_upload_script.php',
        mediaData
      )
      .subscribe((resp) => {
        if (resp) {
          console.log('Upload Successful...');
        } else {
          console.log('Upload Successful.');
        }
      });
  }

  ngOnInit(): void {
    this.isSmart = screen.width < 500 ? true : false;
    this.route.queryParamMap.subscribe((params) => {
      this.course_id = params.get('id');
      this.educator_id = params.get('educator_id');
      this.fetch_question_summary(this.course_id);
    });
  }
}
