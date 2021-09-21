import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";


@Injectable({
    providedIn:'root'
})




export class UserEditResolver implements Resolve<User>{
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser();
    }
    
    constructor(private userService:UserService) {
    
    
    }

}