export interface Reservation{
    destinationId: number;
    destinationCity: string;
    destinationHotel: string;
    numberOfPeople: number;
    totalPrice: number;
    startDate: Date;
    endDate: Date;
}