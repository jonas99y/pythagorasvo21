export class User {
    public constructor(public images: Array<string>,
                       public firstname: string,
                       public lastname:string,
                       public firebaseUserID: string) { };

}
