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

@NgModule({
  declarations: [		
    AppComponent,
      NavBarComponent,
      FooterComponent,
      CoverComponent,
      NotFoundComponent,
      SearchComponent,
      ArtistProfileComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
