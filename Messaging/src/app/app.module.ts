import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { SafePipe } from './safe.pipe';

export const routes: Routes=[
  { path:'', component: AppComponent, pathMatch: 'full' },
  { path:'login', component: LoginComponent, pathMatch: 'full' },
  { path:'register', component: RegisterComponent, pathMatch: 'full' },
  { path:'home', component: HomeComponent, pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UploadDocumentComponent,
    SafePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,

  ],
  providers: [HttpClient, SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
