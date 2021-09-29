
import { Accomodation } from "./accomodation";
import { Photo } from "./photo";
import { Room } from "./rooms";

export interface Destination{
    id: number;
    city: string;
    hotel: string;
    transportation: string;
    stars: number;
    description: string;
    tripPlan: string;
    price: number;
    dateAdded: Date;
    type: string;
    rooms:Room[]
    photos:Photo[];
    photoUrl:string;
    likesCount:number;
    accomodations:Accomodation[];
    minPrice:number;
}