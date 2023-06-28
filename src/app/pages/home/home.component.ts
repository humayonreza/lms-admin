import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mediaPath: string = '';
  arrContents: any = [];
  arrNavByUser: any = [];
  isSmart: boolean = false;
  constructor(
    private backendService: BackendService,
    public stateService: StateService,
    public dataService: DataService,
    private router: Router
  ) {}

  educator_action(course_id: string, action_id: number) {
    console.log(course_id + ' ' + action_id);
    if (action_id == 1) {
      // this.router.navigate(['/manage-content']);
      this.router.navigate(['/manage-content'], {
        queryParams: {
          id: course_id,
          educator_id: this.stateService.educator_id,
        },
      });
    } else if (action_id == 2) {
      // this.router.navigate(['/manage-content']);
      this.router.navigate(['/question-bank'], {
        queryParams: {
          id: course_id,
          educator_id: this.stateService.educator_id,
        },
      });
    } else if (action_id == 3) {
      // this.router.navigate(['/manage-content']);
      this.router.navigate(['/media-gallary'], {
        queryParams: {
          id: course_id,
          educator_id: this.stateService.educator_id,
        },
      });
    } else if (action_id == 4) {
      // this.router.navigate(['/manage-content']);
      this.router.navigate(['/evaluate-assessment'], {
        queryParams: {
          id: course_id,
          educator_id: this.stateService.educator_id,
        },
      });
    }
  }

  ngOnInit(): void {
    this.isSmart = screen.width < 500 ? true : false;
    this.mediaPath = this.backendService.mediaPath;
    this.arrContents = this.dataService.web_content.filter(
      (p: any) => p.page_id == 'home'
    );
  }
}
