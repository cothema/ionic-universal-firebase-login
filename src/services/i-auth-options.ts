export interface IAuthOptions {
    afterLoginPage: string | false;
    signInPage: string | false;
    storage: false | "firestore"; // TODO: implement localStorage
    storageUserTable: string | null;
}
