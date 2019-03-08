
export class Album {
    id: string;
    ref: string;
    name: string;
    title: string;
    description: string;
    duration: number;
    status : string;
    url?: string;
    like?: string;
    tags?: Array<string>

    constructor(id: string,
        ref: string,
        name: string,
        title: string,
        description: string,
        duration: number,
        status : string,
        url?: string,
        like?: string,
        tags?: Array<string>){

        this.id = id;
        this.ref = ref;
        this.name = name;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.status = status;
        this.url = null;
        this.like = null;
        this.tags = [];
    }
}

export class List {
    id : string;
    list: Array<string>;
}