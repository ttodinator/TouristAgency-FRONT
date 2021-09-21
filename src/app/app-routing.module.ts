import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationDetailComponent } from './destinations/destination-detail/destination-detail.component';
import { DestinationListComponent } from './destinations/destination-list/destination-list.component';
import { HomeComponent } from './home/home.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserLikeComponent } from './user-like/user-like.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { DestinationEditComponent } from './admin/destination-edit/destination-edit.component';
import { AdminGuard } from './_guards/admin.guard';
import { CurrencyComponent } from './currency/currency.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:
      [
        {path:'destinations',component:DestinationListComponent},
        {path:'crypto',component:CurrencyComponent},
        {path:'user-reservations',component:UserReservationsComponent},
        {path:'admin-panel',component:AdminHomeComponent,canActivate:[AdminGuard]},
        {path:'destinations/:hotel',component:DestinationDetailComponent,resolve:{destination:UserDetailResolver}},
        {path:'destinations-edit/:hotel',component:DestinationEditComponent,resolve:{destination:UserDetailResolver},canActivate:[AdminGuard],canDeactivate:[PreventUnsavedChangesGuard]},
        {path:'user-likes',component:UserLikeComponent},
        {path:'user-edit',component:UserEditComponent,resolve:{user:UserEditResolver},canDeactivate:[PreventUnsavedChangesGuard]},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
