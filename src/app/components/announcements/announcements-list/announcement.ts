export class Announcement {
    constructor(public id: number,
                public hidden: boolean,
                public room: number,
                public livingPlaces: number,
                public title: string,
                public shortDescription: string,
                public images: Array<Object>

    ) {
    }
}

