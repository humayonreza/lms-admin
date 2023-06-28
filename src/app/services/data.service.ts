import { Injectable } from '@angular/core';

export interface web_content {
  ser: number;
  page_id: string;
  landing_contents: any;
  contents: any;
}

export interface width_options {
  id: number;
  title: string;
  bs_def: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  web_content: web_content[] = [
    {
      ser: 1,
      page_id: 'navbar',
      landing_contents: [],
      contents: [
        {
          id: 1,
          user_type: 'admin',
          is_signed: 0,
          links: [
            {
              ser: 1,
              link_name: 'Home',
              route: '',
              icon: 'home',
            },
            {
              ser: 2,
              link_name: 'Create Content',
              route: '/manage-content',
              icon: 'perm_phone_msg',
            },
            {
              ser: 3,
              link_name: 'Create Question',
              route: '/question-bank',
              icon: 'local_library',
            },
            {
              ser: 4,
              link_name: 'Create Gallary',
              route: '/gallary',
              icon: 'image_search',
            },
            {
              ser: 5,
              link_name: 'Evaluate Assessment',
              route: '/evaluate',
              icon: 'developer_board',
            },
          ],
        },
      ],
    },
    {
      ser: 2,
      page_id: 'home',
      landing_contents: [
        {
          slag: 'RTO SLAG',
          abn: '1234573',
          rto_reg_no: '25428323',
          address: '23 Gilford St, Downhill Madiosary, 2456, Canberra',
          contact: '+61 48634363',
          banner: 'banner.png',
          sliders: [
            {
              title: 'Some title for slider 1',
              txt: 'Some Text for slider 1',
              img: 'slider1.png',
            },
            {
              title: 'Some title for slider 2',
              txt: 'Some Text for slider 2',
              img: 'slider2.png',
            },
            {
              title: 'Some title for slider 3',
              txt: 'Some Text for slider 3',
              img: 'slider3.png',
            },
            {
              title: 'Some title for slider 4',
              txt: 'Some Text for slider 4',
              img: 'slider4.png',
            },
          ],
        },
      ],
      contents: [
        {
          content_id: 1,
          summary: [
            {
              id: 1,
              title: 'Evaluate Assessment',
              img: 'slider1.png',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training.',
            },

            {
              id: 2,
              title: 'Content Management',
              img: 'slider2.png',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training.',
            },
            {
              id: 3,
              title: 'Question Management',
              img: 'slider3.png',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training.',
            },

            {
              id: 4,
              title: 'Media Management',
              img: 'slider4.png',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training.',
            },
          ],
        },
        {
          content_id: 2,
          portfolio: [
            {
              header: 'OUR PORTFOLIO',
              txt1: 'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training. It is imperative for people who wish to enter either hospitality or gaming industry to be in possession of one or both of these certificates. Without either of these certificates, you are legally not permitted to work on licensed premises. It is here, that we step in, to help retain your career!',
              txt2: 'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training. It is imperative for people who wish to enter either hospitality or gaming industry to be in possession of one or both of these certificates. Without either of these certificates, you are legally not permitted to work on licensed premises. It is here, that we step in, to help retain your career!',
              txt3: 'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training. It is imperative for people who wish to enter either hospitality or gaming industry to be in possession of one or both of these certificates. Without either of these certificates, you are legally not permitted to work on licensed premises. It is here, that we step in, to help retain your career!',
              table: [{}],
              img: 'home_portfolio.png',
            },
          ],
        },
        {
          content_id: 3,
          benifits: [
            {
              header: 'EASY AND SIMPLE',
              txt1: 'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training. It is imperative for people who wish to enter either hospitality or gaming industry to be in possession of one or both of these certificates. Without either of these certificates, you are legally not permitted to work on licensed premises. It is here, that we step in, to help retain your career!',
              img: 'benifit1.png',
            },
            {
              header: 'COMPLETELY ONLINE',
              txt1: 'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training. It is imperative for people who wish to enter either hospitality or gaming industry to be in possession of one or both of these certificates. Without either of these certificates, you are legally not permitted to work on licensed premises. It is here, that we step in, to help retain your career!',
              img: 'benifit2.png',
            },
            {
              header: 'LEARNING FRIENDLY',
              txt1: 'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training. It is imperative for people who wish to enter either hospitality or gaming industry to be in possession of one or both of these certificates. Without either of these certificates, you are legally not permitted to work on licensed premises. It is here, that we step in, to help retain your career!',
              img: 'benifit3.png',
            },
            {
              header: '24/7 OPERATION & SUPPORT',
              txt1: 'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. We provide nationally recognised Responsible Service of Alcohol (RSA) and Responsible Gambling Services (RSG) course training. It is imperative for people who wish to enter either hospitality or gaming industry to be in possession of one or both of these certificates. Without either of these certificates, you are legally not permitted to work on licensed premises. It is here, that we step in, to help retain your career!',
              img: 'benifit4.png',
            },
          ],
        },
        {
          content_id: 4,
          title: 'COURSES AT A GLANCE',
          summary: [
            {
              id: 1,
              title: 'RSA',
              // grade_achieved: '10',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. ',
              created_on: '2023-03-12',
            },
            {
              id: 2,
              title: 'First Aid',
              // grade_achieved: '8',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. ',
              created_on: '2023-03-12',
            },
            {
              id: 3,
              title: 'SECURITY OPERATION II',
              // grade_achieved: '10',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. ',
              created_on: '2023-03-12',
            },
            {
              id: 4,
              title: 'CONSTRUCTION SAFETY',
              // grade_achieved: '10',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. ',
              created_on: '2023-03-12',
            },
            {
              id: 5,
              title: 'Some Name',
              // grade_achieved: '9',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. ',
              created_on: '2023-03-12',
            },
            {
              id: 6,
              title: 'Some Name',
              // grade_achieved: '10',
              description:
                'Xtreme Training Australia is the leading RTO in RSA Online and RSG Online courses, renowned for its distinguished offering. ',
              created_on: '2023-03-12',
            },
          ],
        },
      ],
    },

    // ==== About us =====

    {
      ser: 3,
      page_id: 'about',
      landing_contents: [
        {
          img: 'banner.png',
          background: 'Some Background Text',
          about_us: 'Some content',
          mission: 'Some content on mission',
          vision: 'Some content on vision',
        },
      ],
      contents: [
        {
          title: 'Feature Title 1',
          img: 'img1.png',
          contents: [
            {
              info1: '1st info on Feature Title 1',
              info2: '2nd info on Feature Title 1',
              info3: '3rd info on Feature Title 1',
              info4: '4th info on Feature Title 1',
            },
          ],
        },
        {
          title: 'Feature Title 2',
          img: 'img2.png',
          contents: [
            {
              info1: '1st info on Feature Title 2',
              info2: '2nd info on Feature Title 2',
              info3: '3rd info on Feature Title 2',
              info4: '4th info on Feature Title 2',
            },
          ],
        },
        {
          title: 'Feature Title 3',
          img: 'img3.png',
          contents: [
            {
              info1: '1st info on Feature Title 3',
              info2: '2nd info on Feature Title 3',
              info3: '3rd info on Feature Title 3',
              info4: '4th info on Feature Title 3',
            },
          ],
        },
        {
          title: 'Feature Title 4',
          img: 'img3.png',
          contents: [
            {
              info1: '1st info on Feature Title 4',
              info2: '2nd info on Feature Title 4',
              info3: '3rd info on Feature Title 4',
              info4: '4th info on Feature Title 4',
            },
          ],
        },
      ],
    },
    // ============= Contact =======
    {
      ser: 4,
      page_id: 'contact',
      landing_contents: [
        {
          img: 'contact.png',
          contact_us: 'Some content',
          address: [
            {
              address: 'Some address',
              phone: 'some phone no',
              email: 'some email address',
              abn: 'Some ABN no',
              direction: 'Some google address',
              misc: 'some instructions',
            },
          ],
        },
      ],
      contents: [
        {
          title: 'Send us your inquery, we will respond with 24 hours',
          img: 'img1.png',
          query_list: [
            {
              query1: '1st query content 1',
              query2: '2nd query content 1',
              query3: '3rd query content 1',
              query4: '4th query content 1',
            },
          ],
        },
      ],
    },
    // ============= Register =======
    {
      ser: 5,
      page_id: 'register',
      landing_contents: [],
      contents: [
        {
          courses: [],
        },
      ],
    },

    // =======================  Account ===============================
    {
      ser: 6,
      page_id: 'account',
      landing_contents: [],
      contents: [
        {
          courses: [],
        },
      ],
    },
    // ===================  Access Course =============================
    {
      ser: 7,
      page_id: 'access-course',
      landing_contents: [],
      contents: [
        {
          courses: [],
        },
      ],
    },

    {
      ser: 8,
      page_id: 'courses',
      landing_contents: [],
      contents: [
        {
          courses: [
            {
              ser: 1,
              course_id: 'RSA',
              title: 'RSA',
              price_amount: 20,
              img: 'rsa.png',
              thumbnail: 'thumbnail_rsa.png',
              btn_title: 'Choose',
              price_id: 'price_1MzcGEAZxxGe6ponl9PfGiaw',
              description: [
                {
                  ser: 1,
                  txt: 'RSA Course is required to in publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
                },
                {
                  ser: 2,
                  txt: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. ',
                },
              ],
              isSelected: 0,
              features: [
                {
                  id: 1,
                  txt: 'completely online',
                },
                { id: 2, txt: 'Go at your pace' },
                {
                  id: 3,
                  txt: 'Start with trial and pay only when you are ready',
                },
                {
                  id: 4,
                  txt: 'Instant certificate',
                },
              ],
            },
            {
              ser: 2,
              course_id: 'FA',
              title: 'First Aid',
              price_amount: 25,
              img: 'fa.png',
              thumbnail: 'thumbnail_fa.png',
              btn_title: 'Choose',
              price_id: '',
              description: [
                {
                  ser: 1,
                  txt: 'First Aid Course is required to in publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
                },
                {
                  ser: 2,
                  txt: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. ',
                },
              ],
              isSelected: 0,
              features: [
                {
                  id: 1,
                  txt: 'completely online',
                },
                { id: 2, txt: 'Go at your pace' },
                {
                  id: 3,
                  txt: 'Start with trial and pay only when you are ready',
                },
                {
                  id: 4,
                  txt: 'Instant certificate',
                },
              ],
            },
            {
              ser: 3,
              course_id: 'Security',
              title: 'Security',
              price_amount: 35,
              img: 'sy.png',
              thumbnail: 'thumbnail_sy.png',
              btn_title: 'Choose',
              price_id: '',
              description: [
                {
                  ser: 1,
                  txt: 'Security Course is required to in publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
                },
                {
                  ser: 2,
                  txt: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. ',
                },
              ],
              isSelected: 0,
              features: [
                {
                  id: 1,
                  txt: 'completely online',
                },
                { id: 2, txt: 'Go at your pace' },
                {
                  id: 3,
                  txt: 'Start with trial and pay only when you are ready',
                },
                {
                  id: 4,
                  txt: 'Instant certificate',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  width_options: width_options[] = [
    {
      id: 0,
      title: '--- Set width ---',
      bs_def: '0',
    },
    {
      id: 1,
      title: '20%',
      bs_def: '2 | col-sm-2',
    },
    {
      id: 2,
      title: '25% | col-sm-3',
      bs_def: '3',
    },
    {
      id: 3,
      title: '33% | col-sm-4',
      bs_def: '4',
    },
    {
      id: 4,
      title: '50% | col-sm-6',
      bs_def: '6',
    },
    {
      id: 5,
      title: '70% | col-sm-8',
      bs_def: '8',
    },
    {
      id: 6,
      title: '100% | col-sm-12',
      bs_def: '12',
    },
  ];
}
