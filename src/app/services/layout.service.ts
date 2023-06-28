import { Injectable } from '@angular/core';

export interface textEditorOptions {
  id: number;
  icon: string;
  options: any;
}
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor() {}
  textEditorOptions: textEditorOptions[] = [
    {
      id: 1,
      icon: 'title',
      options: [
       
      ],
    },
    {
      id: 2,
      icon: 'text_rotation_none',
      options: [
        { ser: 0, title: '-- FONT SIZE --', value: '0' },
        { ser: 1, title: 'Small', value: '10px' },
        { ser: 2, title: 'Medium', value: '14px' },
        { ser: 3, title: 'Big', value: '16px' },
        { ser: 4, title: 'Large', value: '18px' },
        { ser: 5, title: 'Extra Large', value: '22px' },
      ],
    },
    {
      id: 3,
      icon: 'format_color_text',
      options: [
        { ser: 0, title: '-- FONT COLOR --', value: '0' },
        { ser: 1, title: 'Black', value: 'black' },
        { ser: 2, title: 'Red', value: 'red' },
        { ser: 3, title: 'Blue', value: 'blue' },
        { ser: 4, title: 'Green', value: 'green' },
        { ser: 5, title: 'Orange', value: 'Orange' },
      ],
    },
    {
      id: 4,
      icon: 'format_list_bulleted',
      options: [
        { ser: 0, title: '-- BULLET --', value: '0' },
        { ser: 1, title: 'No', value: 'N' },
        { ser: 1, title: 'Yes', value: 'Y' },
      ],
    },
  ];

  get_style_option_list(id: number) {
    let data = this.textEditorOptions.filter((p: any) => (p.id = id));
    return data[0].options;
  }
}
