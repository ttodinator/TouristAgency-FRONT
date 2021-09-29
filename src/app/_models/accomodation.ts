export interface Accomodation{
    id:number;
    destinationId:number;
    name:string;
    pricePerDay:number,
    numberOfPeople:number;
    occupied:boolean;
    roomNumber:number;
    orderNo:number;
    balcony:boolean;
    editable:boolean;
}