export class User {
    public constructor(public drawings: Array<string>,
                       public firstname: string,
                       public lastname,
                       public firebaseUserID: string) { };

}
