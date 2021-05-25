import { InfoComponent } from './artist-profile/info/info.component';
import { ContactComponent } from './artist-profile/contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DiscographyComponent } from './artist-profile/discography/discography.component';
import { MembersComponent } from './artist-profile/members/members.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CoverComponent } from './cover/cover.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConcertsComponent } from './concerts/concerts.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/interceptors/auth-interceptor.service';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";
import { EmailFormComponent } from './email-form/email-form.component';



@NgModule({
  declarations: [
    AppComponent,
      NavBarComponent,
      FooterComponent,
      CoverComponent,
      NotFoundComponent,
      SearchComponent,
      ArtistProfileComponent,
      MembersComponent,
      DiscographyComponent,
      ConcertsComponent,
      LoginComponent,
      RegisterComponent,
      EmailFormComponent,
      ContactComponent,
      InfoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
    },
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
