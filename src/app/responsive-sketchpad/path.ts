import { Stroke } from './stroke';
export class Path {
    public Strokes: Array<Stroke>;
    constructor(public lineWidth: number, public lineColor: string)
    { 
        this.Strokes = new Array<Stroke>();
    }
}
