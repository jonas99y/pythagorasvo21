export class User {
    public constructor(public images: Array<string>,
        public firstname: string,
        public lastname: string,
        public uid: string) { };

    // public get fullname(): string {
    //     console.log("test");
    //     return this.firstname + " " + this.lastname;
    // }

    public fullname:string = "Jonas Wyss";
}
