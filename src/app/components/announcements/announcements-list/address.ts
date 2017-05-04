
export class Address{
    constructor(public id: number,
                public announcementId: number,
                public country: string,
                public city: string,
                public region: string,
                public street: string,
                public latitude: number,
                public longitude: number) {
    }
}

