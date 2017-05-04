export interface IBookingRequest {
    id?: number;
    checkIn: string;
    checkOut: string;
    idAnnouncement: number;
    comment?: string;
    approved: boolean;
}