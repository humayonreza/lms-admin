import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  staff_email: string = 'reza@trainedup.com';
  passwd: string = 'admin';
  mediaPath: string = '';
  arrContents: any = [];
  arrNavByUser: any = [];
  isExpanded: boolean = false;
  isSmart: boolean = false;
  constructor(
    private backendService: BackendService,
    public stateService: StateService,
    private dataService: DataService,
    private router: Router
  ) {}

  arrCourseOwned: any = [];
  login(payload: any) {
    const data = {
      staff_email: payload.staff_email,
      passwd: payload.passwd,
      chCode: 'hg_gt78999@%^&',
      queryId: '1078234',
    };
    this.backendService.SubmitQueryAdmin(data).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('No data...');
      } else {
        this.stateService.arrContents = resp[0];
        this.stateService.loggedUser =
          resp[0].first_name + ' ' + resp[0].last_name;
        this.stateService.educator_id = resp[0].staff_id;
        this.stateService.isSigned = true;
        this.stateService.arrCourses = resp[0].courses;
        localStorage.setItem('session_ls', JSON.stringify(resp[0]));
        console.log('Data @state: ', this.stateService.arrCourses);
        this.isExpanded = true;
        this.router.navigate(['/']);
      }
    });
  }

  signup_now() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    this.mediaPath = this.backendService.mediaPath;
  }
}
