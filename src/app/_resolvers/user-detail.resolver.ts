import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import { DestinationService } from "../_services/destination.service";
import { UserService } from "../_services/user.service";


@Injectable({
    providedIn:'root'
})

export class UserDetailResolver implements Resolve<User>{
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.destinationService.getDestination(route.paramMap.get('hotel'));
    }
    
    constructor(private destinationService:DestinationService) {
    
    
    }

}