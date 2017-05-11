export class User {
    public constructor(public images: Array<string>,
                       public firstname: string,
                       public lastname:string,
                       public username:string,
                       public firebaseUserID: string) { };

}
