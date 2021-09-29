import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';

import { DestionationCardComponent } from './destinations/destionation-card/destionation-card.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { DestinationListComponent } from './destinations/destination-list/destination-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { UserLikeComponent } from './user-like/user-like.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DestinationDetailComponent } from './destinations/destination-detail/destination-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HasRoleDirective } from './_directives/has-role.directive';
import { DestinationManagementComponent } from './admin/destination-management/destination-management.component';
import { AddDestinationComponent } from './admin/add-destination/add-destination.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RolesModalComponent } from './_modals/roles-modal/roles-modal.component';
import { DestinationEditComponent } from './admin/destination-edit/destination-edit.component';
import { DestinationPhotoComponent } from './admin/destination-photo/destination-photo.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FooterComponent } from './footer/footer.component';
import { CurrencyComponent } from './currency/currency.component';
import { AccomodationManagementComponent } from './destinations/accomodation-management/accomodation-management.component';
import { AccomodationEditComponent } from './destinations/accomodation-edit/accomodation-edit.component';
import { ReservationManagementComponent } from './admin/reservation-management/reservation-management.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DestinationListComponent,
    DestionationCardComponent,
    UserLikeComponent,
    UserEditComponent,
    DatePickerComponent,
    DestinationDetailComponent,
    HasRoleDirective,
    DestinationManagementComponent,
    AddDestinationComponent,
    AdminHomeComponent,
    UserReservationsComponent,
    UserManagementComponent,
    RolesModalComponent,
    DestinationEditComponent,
    DestinationPhotoComponent,
    FooterComponent,
    CurrencyComponent,
    AccomodationManagementComponent,
    AccomodationEditComponent,
    ReservationManagementComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ButtonsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    FileUploadModule
    
  ],

  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
