import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss'],
})
export class EvaluateComponent implements OnInit {
  mediaPath: string = '';
  isSmart: boolean = false;
  isCourseComplete: boolean = false;
  resp: string = '';
  txtCompletion: string = 'Incomplete';
  audio: any;
  course_id: any;
  educator_id: any;
  arrContents: any = [];
  arrNavByUser: any = [];
  evalQue: any = [];
  arrRemarksPB: any = [];
  arrRemarksSP: any = [];
  arrCourses: any = [];
  @Input() arrContent: any = {};

  constructor(
    private backendService: BackendService,
    public stateService: StateService,
    public dataService: DataService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  fetch_list_tobe_evaluate(course_id: string) {
    let dx = {
      course_id,
      chCode: 'hg_gt78999@%^&',
      queryId: '1001',
    };
    console.log(dx);
    this.backendService.SubmitQueryAdmin(dx).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        if (resp.length > 0) {
          console.log(resp);
          this.arrCourses = resp;
        } else {
          console.log('No such course available..');
        }
      }
    });
  }

  openSnackBar(message: string, action: string, {}) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['bg-snackbar'],
    });
  }

  get_assessment_obj(course_id: string) {
    let dx = {
      course_id,
      chCode: 'hg_gt78999@%^&',
      queryId: '1001A',
    };
    this.backendService.SubmitQueryAdmin(dx).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        this.evalQue = resp;
        console.log('evalQue : ', this.evalQue);
      }
    });
  }

  review_assessment(
    course_id: string,
    student_id: string,
    assessment_type: number
  ) {
    console.log(course_id + ' ' + student_id + ' ' + assessment_type);
    let dx = {
      course_id,
      student_id,
      assessment_type,
      chCode: 'hg_gt78999@%^&',
      queryId: '1002',
    };
    console.log(dx);
    this.backendService.SubmitQueryAdmin(dx).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
        this.evalQue = resp;
      }
    });
  }

  play_audio(student_id: string, question_id: string) {
    this.audio = [];
    let file_name = student_id + '_' + question_id + '.wav';
    console.log(question_id);
    this.audio = new Audio();
    this.audio.src =
      this.mediaPath + 'audio/assessments/' + this.course_id + '/' + file_name;
    this.audio.load();
    this.audio.play();
  }

  isComplete: boolean = false;

  assess_assignment() {
    this.isComplete = this.isComplete == false ? true : false;
    this.txtCompletion = this.isComplete == true ? 'Passed' : 'failed';
  }

  evaluate_answer(
    student_id: number,
    session_id: string,
    question_id: string,
    result: number
  ) {
    console.log(
      student_id + ' - ' + session_id + ' - ' + question_id + ' - ' + result
    );
    let arr = this.evalQue.filter((p: any) => p.student_id == student_id)[0]
      .response;
    console.log('Arr : ', arr);
    let arrBySession = arr.filter((p: any) => p.session_id == session_id)[0]
      .prog_breakdown;
    let index = arrBySession.findIndex(
      (p: any) => p.question_id == question_id
    );
    arrBySession[index].isPassed = result;

    let is_passed = arrBySession.findIndex((p: any) => p.isPassed == 0);
    if (is_passed == -1) {
      console.log('All passed : ', is_passed);
      let arrResult = arr.filter((p: any) => p.session_id == session_id);
      arrResult[0].has_completed = 1;
      console.log(arrResult);
    } else {
      console.log('Not all passed : ', is_passed);
      let arrResult = arr.filter((p: any) => p.session_id == session_id);
      arrResult[0].has_completed = 0;
      console.log(arrResult);
    }

    console.log(
      arrBySession[index].question_id + '-' + arrBySession[index].isPassed
    );
    console.log('Updated Result : ', this.evalQue);
  }

  evaluate_assessment(data: any) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].session_id);
      this.update_student_progress(
        data[i].session_id,
        data[i].student_id,
        data[i].has_completed
      );

      for (let k = 0; k < data[i].prog_breakdown.length; k++) {
        this.update_student_progress_breakdown(
          data[i].session_id,
          data[i].prog_breakdown[k].question_id,
          data[i].prog_breakdown[k].isPassed,
          1
        );
        console.log(data[i].prog_breakdown[k].question_id);
      }
    }
  }

  update_student_progress(
    session_id: string,
    student_id: string,
    has_completed: number
  ) {
    console.log(student_id + ' - ' + session_id + ' - ' + has_completed);
    let dx = {
      session_id,
      student_id,
      has_completed,
      isGarbage: has_completed == 0 ? 1 : 0,
      chCode: 'hg_gt78999@%^&',
      queryId: '1011',
    };
    console.log(dx);
    this.backendService.SubmitQueryAdmin(dx).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
        // this.evalQue = resp;
      }
    });
  }

  update_student_progress_breakdown(
    session_id: string,
    question_id: string,
    isPassed: number,
    isGarbage: number
  ) {
    console.log(question_id + ' - ' + session_id + ' - ' + isPassed);
    let dx = {
      session_id,
      question_id,
      isPassed,
      isGarbage,
      chCode: 'hg_gt78999@%^&',
      queryId: '1012',
    };
    console.log(dx);
    this.backendService.SubmitQueryAdmin(dx).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
        // this.evalQue = resp;
      }
    });
  }

  openModal(data: any) {
    console.log(data);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      height: '500px',
      // data: viewId + '-' + param1 + '-' + param2,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Return from Modal : ', result);
      }
    });
  }

  back_to_home() {
    this.router.navigate(['/']);
  }

  // ================================================================================

  arrAssessmentObj: any = [];

  get_assessment_obj_by_student_id(student_id: number) {
    console.log(student_id);
    this.arrAssessmentObj = this.evalQue.filter(
      (p: any) => p.student_id == student_id
    );
    console.log(this.arrAssessmentObj);
  }

  authorize_certificate(student_id: number) {
    console.log(student_id);
    console.log(this.course_id);
  }

  // ================================================================================

  ngOnInit(): void {
    this.mediaPath = this.backendService.mediaPath;
    this.route.queryParamMap.subscribe((params) => {
      this.course_id = params.get('id');
      this.educator_id = params.get('educator_id');
      // this.fetch_list_tobe_evaluate(this.course_id);
      this.get_assessment_obj(this.course_id);
    });
  }
}
