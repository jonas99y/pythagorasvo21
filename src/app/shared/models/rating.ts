export class Rating {
    public constructor(public totalScore: number, public scores: { [character: string]: string },
     public ratings: {[userKey: string]: string}) { };

}