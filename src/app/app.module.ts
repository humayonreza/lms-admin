import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { WebcamModule } from 'ngx-webcam';
import { CKEditorModule } from 'ng2-ckeditor';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { EvaluateComponent } from './dashboard/evaluate/evaluate.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { ModalComponent } from './components/modal/modal.component';
import { CkeditorComponent } from './components/ckeditor/ckeditor.component';
import { ManagecontentComponent } from './dashboard/managecontent/managecontent.component';
import { QuestionbankComponent } from './dashboard/questionbank/questionbank.component';
import { GallaryComponent } from './dashboard/gallary/gallary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FaqsComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    EvaluateComponent,
    AdminComponent,
    ModalComponent,
    CkeditorComponent,
    ManagecontentComponent,
    QuestionbankComponent,
    GallaryComponent,
  ],
  imports: [
    MatInputModule,
    CKEditorModule,
    MatDialogModule,
    MatSlideToggleModule,
    WebcamModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatExpansionModule,
    MatStepperModule,
    SlickCarouselModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent,
        },
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'evaluate-assessment',
          component: EvaluateComponent,
        },
        {
          path: 'manage-content',
          component: ManagecontentComponent,
        },
        {
          path: 'question-bank',
          component: QuestionbankComponent,
        },
        {
          path: 'register',
          component: RegisterComponent,
        },
        {
          path: 'media-gallary',
          component: GallaryComponent,
        },
      ],
      { onSameUrlNavigation: 'reload' }
    ),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
