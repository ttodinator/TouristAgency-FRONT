import { Passenger } from "./passenger";

export interface Reservation{
    reservationId:number;
    destinationId: number;
    destinationCity: string;
    destinationHotel: string;
    numberOfPeople: number;
    totalPrice: number;
    startDate: Date;
    endDate: Date;
    passengers:Passenger[];
    status:string;
}