import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class StateService {
  arrNav: any = [];
  educator_id: string = '0';
  loggedUser: string = '';
  arrCourses: any = [];
  // ==============
  selectedTemplateId: string = 'A';
  selectedTabId: number = 0;
  arrSavedContents: any = [];
  enable_visit_site: boolean = true;
  arrStudentProgress: any = [];
  arrContents: any = [];
  arrProgressAssessment1: any = [];
  arrProgressAssessment2: any = [];
  arrValidateStudent: any = [];
  arrEditParam: any = {};
  content_id: any;
  user_type: string = 'visitor';
  isSigned: boolean = false; //flag 1000
  objCourseSelected: any = [];
  is_bullet: number = 0;
  content_data: string = '';
  isBold: boolean = false;
  course_id: string = '';
  module_id: string = '';
  page_id: string = '';
  page_content: any;
  public model = {
    editorData: '<p></p>',
  };
  content_type: string = '';
  class_name: string = '';
  template_id: string = '';
  ser: number = 0;
  cols: number = 0;
  pk: string =
    'pk_test_51LEp8lAZxxGe6ponjxOXXLeajjNYAjWe8AoakcazchdUrpao45MZrEJN6iiUxljO8i9ZsyLAmbx88ypfB1WSXYnU001ncIv1j2';
  constructor(private http: HttpClient) {}
  // image_data question_id student_id
  get_image_data(student_id: string, question_id: string) {
    let index = this.arrValidateStudent.findIndex(
      (p: any) => p.studend_id == student_id && p.question_id == question_id
    );
    console.log(' IM Data', this.arrValidateStudent[index].image_data);
    return this.arrValidateStudent[0].image_data;
  }

  check_student_completion_state_on_assimilation(
    question_id: number,
    assessment_type: number
  ) {
    let index = this.arrStudentProgress[0].assessment_cat1.findIndex(
      (p: any) =>
        p.question_id == question_id && p.assessment_type == assessment_type
    );
    if (index == -1) {
      return 0;
    } else {
      return this.arrStudentProgress[0].assessment_cat1[index].has_completed;
    }
  }

  check_student_completion_state_on_module_assessment(
    course_id: string,
    module_id: string,
    assessment_type: number
  ) {
    let index = this.arrStudentProgress[0].assessment_cat2.findIndex(
      (p: any) =>
        p.course_id == course_id &&
        p.module_id == module_id &&
        p.assessment_type == assessment_type
    );
    if (index == -1) {
      return 0;
    } else {
      return this.arrStudentProgress[0].assessment_cat1[index].has_completed;
    }
    // console.log(course_id + ' ' + module_id + ' ' + assessment_type);
  }

  generate_timestamp_id() {
    const d = new Date();
    return d.getTime();
  }
}
