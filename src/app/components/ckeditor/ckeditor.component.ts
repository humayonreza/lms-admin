import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { StateService } from 'src/app/services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { StateService } from 'src/app/services/state.service';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss'],
})
export class CkeditorComponent implements OnInit {
  // @Input() params: any = {};
  content: any;
  txtBtn: string = 'Save Content';
  response: string = '';
  arrPageContent: any = [];
  action_id: string = 'addContent';
  page_no: number = 0;
  public model = {
    editorData: '<p></p>',
  };

  constructor(
    private backendService: BackendService,
    public stateService: StateService,
    private _snackBar: MatSnackBar
  ) {}

  save_edit_content() {
    let data = {
      course_id: this.stateService.course_id,
      module_id: this.stateService.module_id,
      page_id: this.stateService.page_id,
      content: this.stateService.model.editorData,
      class_name: 'NA',
      chCode: 'hg_gt78999@%^&',
      queryId: '1003',
    };
    console.log(data);
    this.backendService.SubmitQueryAdmin(data).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
        this.action_id = 'editContent';
        this.response = resp.Msg;
        this.openSnackBar(resp.Msg, 'Close', {});
      }
    });
  }

  openSnackBar(message: string, action: string, {}) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['bg-snackbar'],
    });
  }

  ngOnInit(): void {
    this.action_id =
      this.stateService.model.editorData == '' ? 'addContent' : 'editContent';
  }
}
