import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // @Input() arrNav: any = [];
  // arrNav: any = [];
  mediaPath: string = '';
  // student_email: string = '';
  // passwd: string = '';
  // arrCourseOwned: any = [];
  isSmart: boolean = false;
  constructor(
    private backendService: BackendService,
    public stateService: StateService,
    public dataService: DataService,
    private router: Router
  ) {}

  change_route(route: string) {
    this.router.navigate([route]);
    for (let i = 0; i < this.stateService.arrNav[0].links.length; i++) {
      this.stateService.arrNav[0].links[i].isActive =
        this.stateService.arrNav[0].links[i].route == route ? 1 : 0;
    }
    console.log(
      'isActive : ',
      this.stateService.arrNav[0].links + ' route :' + route
    );
  }

  logoff_now() {
    this.stateService.isSigned = false;
    const sess_info = localStorage.getItem('session_ls');
    if (sess_info != null) {
      localStorage.removeItem('session_ls_login');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  login_now() {
    this.router.navigate(['/login']);
  }

  get_logged_user_details() {
    const user = localStorage.getItem('session_ls');
    if (user != null) {
      console.log('Logged User : ', JSON.parse(user).first_name);
      this.stateService.loggedUser =
        JSON.parse(user).first_name + ' ' + JSON.parse(user).last_name;
    }
  }

  ngOnInit(): void {
    this.isSmart = screen.width < 500 ? true : false;
    this.mediaPath = this.backendService.mediaPath;

    this.stateService.arrNav = this.dataService.web_content.filter(
      (p: any) => p.page_id == 'navbar'
    )[0].contents;
    console.log('arrNav :', this.stateService.arrNav[0].links);

    const sess_info = localStorage.getItem('session_ls_login');
    if (sess_info != null) {
      if (this.stateService.arrNav[0].links.length > 0) {
        this.stateService.isSigned = true;
        this.get_logged_user_details();
        console.log('Href :', window.location.href);
        let str = window.location.href;
        // let routeStr = str.split( 'http://localhost:4200' );
        let routeStr = str.split('https://smartsoln.org/trainedup');
        // let routeStr = str.split('http://localhost:4200');
        console.log('routeStr[1] :', routeStr[1]);
      }
    } else {
      console.log('I am here');
      this.stateService.isSigned = false;
      let str = window.location.href;
      // let routeStr = str.split( 'http://localhost:4200' );
      let routeStr = str.split('https://smartsoln.org/trainedup');
      // let routeStr = str.split('http://localhost:4200');
      console.log('routeStr[1] :', routeStr[1]);
      // const currentRoute = routeStr[1] == '' ? '' : routeStr[1];
      // this.change_route(currentRoute);
    }
  }
}

// import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { BackendService } from 'src/app/services/backend.service';
// import { DataService } from 'src/app/services/data.service';
// import { StateService } from 'src/app/services/state.service';
// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss'],
// })
// export class NavbarComponent implements OnInit {
//   @Input() arrNav: any = [];
//   mediaPath: string = '';
//   student_email: string = '';
//   passwd: string = '';
//   arrCourseOwned: any = [];
//   constructor(
//     private backendService: BackendService,
//     public stateService: StateService,
//     public dataService: DataService,
//     private router: Router
//   ) {}

//   signoff() {
//     const sess_info = localStorage.getItem('session_ls');
//     if (sess_info != null) {
//       localStorage.removeItem('session_ls_login');
//       localStorage.removeItem('session_ls');
//       this.stateService.isSigned = false;
//       this.stateService.objCourseSelected = [];
//     }
//   }

//   signup_now() {
//     this.router.navigate(['/register']);
//   }

//   login(payload: any) {
//     const data = {
//       student_email: payload.student_email,
//       passwd: payload.passwd,
//       chCode: 'hg_gt78999@%^&',
//       queryId: '1',
//     };
//     this.backendService.SubmitQueryStudent(data).subscribe((resp: any) => {
//       if (resp.ResponseCode == '401') {
//         console.log('No data...');
//       } else {
//         this.stateService.isSigned = true;
//         this.stateService.arrContents = resp[0];
//         localStorage.setItem('session_ls', JSON.stringify(resp[0]));
//         localStorage.setItem('session_ls_login', JSON.stringify(data));
//         this.arrCourseOwned = resp[0].course_purchased;
//         this.stateService.arrProgressAssessment1 = resp[0].progress_assessment1;
//         this.stateService.arrProgressAssessment2 = resp[0].progress_assessment2;
//         console.log('logged student Data @state: ', resp);
//         this.router.navigate(['/register']);
//       }
//     });
//   }

//   logoff_now() {
//     const sess_info = localStorage.getItem('session_ls');
//     if (sess_info != null) {
//       localStorage.removeItem('session_ls');
//       this.stateService.isSigned = false;
//       this.router.navigate(['/login']);
//     }
//   }

//   ngOnInit(): void {
//     const sess_info = localStorage.getItem('session_ls');
//     if (sess_info != null) {
//       this.stateService.isSigned = true;
//       console.log(this.stateService.isSigned);
//     }
//     console.log('arrNav :', this.arrNav);
//     this.mediaPath = this.backendService.mediaPath;
//   }
// }
