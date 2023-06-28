import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ThemePalette } from '@angular/material/core';
import { StateService } from 'src/app/services/state.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

export interface arrTemplate {
  element_id: string;
  element_title: string;
}

export interface arrLayout {
  template_id: string;
  is_multi_cols: string;
  content_id: string;
  content_title: string;
}

@Component({
  selector: 'app-managecontent',
  templateUrl: './managecontent.component.html',
  styleUrls: ['./managecontent.component.scss'],
})
export class ManagecontentComponent implements OnInit {
  color: ThemePalette = 'warn';
  mediaPath: string = '';
  isContentView: boolean = false;
  showFiller = false;
  isLinear: boolean = false;
  isCreateContent: boolean = false;
  isUpdateContent: boolean = false;
  isQCdisabled: boolean = false;
  isQIddisabled: boolean = false;
  selectedIndex: number = 0;
  course_id: any;
  educator_id: any;
  course_title: string = '';
  course_duration: string = '';
  guidelines: string = '';
  remarks: string = '';
  logo: string = '';
  module_id: string = '';
  module_title: string = '';
  module_desc: string = '';
  module_index: string = '';
  resp: string = '';
  page_id: string = '';
  assessment_type: number = 0;
  question_category: number = 0;
  isSmart: boolean = false;
  question_id: number = 0;
  arrCourses: any = [];
  arrModules: any = [];
  arrQuestions: any = [];
  arrContent: any = [];
  arrContentStructure: any = [];
  arrPageContents: any = [];
  arrEditParam: any = [];
  arrNavByUser: any = [];
  arrPageContent: any = [];
  paramsContent: any = {};
  constructor(
    private backendService: BackendService,
    public stateService: StateService,
    public dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  open_modal(course_id: string) {
    let payload = {
      action_type: 1,
      title: 'Get Media Path',
      course_id,
    };
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '100%',
      height: 'auto',
      data: {
        payload,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Return from Modal : ', result);
      }
    });
  }

  add_course(val: any) {
    console.log('Course', val);
    let data = {
      course_id: val.course_id,
      course_title: val.course_title,
      course_duration: val.course_duration,
      guidelines: val.guidelines,
      logo: val.course_id,
      queryId: '1',
    };
    this.submit_to_backend(data);
  }

  add_module(val: any) {
    console.log('module', val);
    let data = {
      course_id: val.course_id,
      module_id: val.module_id,
      module_title: val.module_title,
      module_desc: val.module_desc,
      module_index: val.module_index,
      queryId: '2',
    };
    this.submit_to_backend(data);
  }

  add_page(val: any) {
    let data = {
      module_id: val.module_id,
      page_id: val.page_id,
      assessment_type: val.assessment_type,
      question_category: val.assessment_type == 2 ? 0 : val.question_category,
      question_id: val.assessment_type == 2 ? 0 : val.question_id,
      queryId: '3',
    };
    console.log(data);
    this.submit_to_backend(data);
  }

  submit_to_backend(data: any) {
    this.resp = '';
    console.log(data);
    this.backendService.SubmitQueryCms(data).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log(resp);
        this.fetch_contents(this.course_id);
        this.resp = resp.Msg;
      }
    });
  }

  on_change_assessment_type($event: any) {
    if ($event.target.value == 2) {
      this.isQCdisabled = true;
      this.isQIddisabled = true;
      this.question_category = 0;
      this.question_id = 0;
    } else {
      this.isQCdisabled = false;
      this.isQIddisabled = false;
    }
  }

  on_change_course($event: any) {
    console.log($event.target.value);
    this.arrModules = [];
    const i = this.arrCourses.findIndex(
      (p: any) => p.course_id == $event.target.value
    );
    this.arrModules = this.arrCourses[i].modules;
    let data = {
      ser: 0,
      course_id: '',
      is_active: 0,
      module_desc: '',
      module_id: '',
      module_index: '',
      module_title: '-- Select Module --',
      pages: 0,
    };
    this.arrModules.push(data);
    this.arrModules.sort((a: any, b: any) => (a.ser > b.ser ? 1 : -1));
    console.log('arrModules :', this.arrModules);
  }

  on_change_module_generate_ques_list(event: any) {
    console.log('module : ', event.target.value);
    let course = this.arrCourses.filter(
      (p: any) => p.course_id == this.course_id
    );

    let module = course[0].modules.filter(
      (q: any) => q.module_id == event.target.value
    );
    console.log('Questions : ', module[0].queslist);
    console.log('arrQuestions :', module[0].queslist);
    this.arrQuestions = module[0].queslist;
    let data = {
      question_id: '',
      question_text: '-- Select Question --',
    };
    this.arrQuestions.push(data);
    this.arrQuestions.sort((a: any, b: any) =>
      a.question_id > b.question_id ? 1 : -1
    );
    console.log('arrQuestions :', this.arrQuestions);
  }

  create_content(data: any, course_id: string) {
    this.arrPageContent = [];
    this.stateService.course_id = course_id;
    this.stateService.module_id = data.module_id;
    this.stateService.page_id = data.page_id;

    let params = {
      course_id: course_id,
      module_id: data.module_id,
      page_id: data.page_id,
      chCode: 'hg_gt78999@%^&',
      queryId: '1004',
    };
    console.log(params);
    this.backendService.SubmitQueryAdmin(params).subscribe((resp: any) => {
      if (resp == '401') {
        console.log('No data...');
        this.isCreateContent = true;
        this.stateService.model.editorData = '';
      } else {
        console.log(resp);
        this.arrPageContent = resp;
        if (resp[0].content != '') {
          this.stateService.model.editorData = resp[0].content;
          console.log('content : ', this.stateService.page_content);
          this.isCreateContent = true;
        } else {
          this.stateService.model.editorData = '';
          console.log('No content found');
        }
      }
    });
  }

  select_content_to_update(course_id: string, page: any) {
    this.isCreateContent = false;
    this.isUpdateContent = true;
    this.arrPageContents = page.template;
  }

  update_content(content: any) {
    this.arrEditParam = [];
    this.arrEditParam = content;

    let data = {
      ser: this.arrEditParam.ser,
      content_type: this.arrEditParam.content_type,
      content_data: this.arrEditParam.content,
      is_bullet: this.arrEditParam.is_bullet,
      template_id: this.arrEditParam.template_id,
      class_name: this.arrEditParam.class_name,
      cols: this.arrEditParam.cols,
    };
    this.stateService.arrEditParam = data;
    console.log('arrEditParam@ state :', this.stateService.arrEditParam);
  }

  tab_click(val: number) {
    this.selectedIndex = val;
  }

  add_content_structure(data: any) {
    this.stateService.content_id = this.create_content_id();
    let dx = {
      content_id: this.stateService.content_id,
      subject_id: this.arrContent.subject_id,
      page_id: this.arrContent.page_id,
      element_id: data.element_id,
      txt_data: 'NA',
      img_name: 'NA',
      table_data: 'NA',
      class_name: 'NA',
      queryId: '5',
    };
    console.log('dx ;', dx);
  }

  // template_id	layout_id	layout_title
  add_template_layout(data: any) {
    this.arrContentStructure = [];
    this.stateService.enable_visit_site = false;
    this.stateService.content_id = this.create_content_id();
    let payload = {
      template_id: this.stateService.content_id,
      content_id: data.content_id, //> 3 ? 1 : 0, // 0 = Single Column 1 = Multi column
      is_multi_cols: data.is_multi_cols,
      module_id: this.arrContent[0].module_id,
      page_id: this.arrContent[0].page_id,
      queryId: '15',
    };
    this.arrContentStructure.push(payload);
    console.log('payload : ', payload);
    this.backendService.SubmitQueryAdmin(payload).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        console.log('Data : ', resp);
        this.arrContentStructure.push(payload);
        console.log(this.arrContentStructure);
      }
    });
  }

  create_content_id() {
    const d = new Date();
    let timeStamp = d.getTime();
    return 'T' + timeStamp;
  }

  fetch_contents(course_id: string) {
    let data = {
      course_id,
      chCode: 'hg_gt78999@%^&',
      queryId: '6A',
    };
    console.log(data);
    this.backendService.SubmitQueryAdmin(data).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        if (resp.length > 0) {
          this.arrCourses = resp;
          console.log('resp : ', resp);
          this.course_title = resp[0].course_title;
          this.course_duration = resp[0].course_duration;
          this.guidelines = resp[0].guidelines;
          this.arrModules = resp[0].modules;
        } else {
          console.log('Course does not exist..');
        }
      }
    });
  }

  back_to_home() {
    this.router.navigate(['/']);
  }

  get_media_list(course_id: string) {
    console.log(course_id);
  }

  ngOnInit(): void {
    this.isSmart = screen.width < 500 ? true : false;
    this.mediaPath = this.backendService.mediaPath;
    this.route.queryParamMap.subscribe((params) => {
      this.course_id = params.get('id');
      this.educator_id = params.get('educator_id');
      this.fetch_contents(this.course_id);
    });
  }
}
