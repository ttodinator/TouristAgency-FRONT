import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserEditComponent } from '../user-edit/user-edit.component';


@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: UserEditComponent): boolean {
      if(component.editForm.dirty){
        return confirm('Are you sure you want to leave')
      }
    return true;
  }
  
}
