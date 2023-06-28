import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  mediaPath: string = '';
  first_name: string = '';
  last_name: string = '';
  usi: string = '';
  arrContents: any = [];
  arrNavByUser: any = [];
  isLinear: boolean = false;
  constructor(
    private backendService: BackendService,
    public stateService: StateService,
    public dataService: DataService
  ) {}

  save_personal_info(payload: any) {}
  ngOnInit(): void {
    this.mediaPath = this.backendService.mediaPath;
    this.arrContents = this.dataService.web_content;

    let arrNav = this.dataService.web_content.filter(
      (p: any) => p.page_id == 'navbar'
    );

    console.log(arrNav);
    this.arrNavByUser = arrNav[0].contents.filter(
      (m: any) => m.user_type == this.stateService.user_type
    );
    console.log(this.arrNavByUser);
  }
}
