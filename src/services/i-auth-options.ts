export interface IAuthOptions {
    afterLoginPage: string | false;
    loginPage: string | false;
    storage: false | "firestore"; // TODO: implement localStorage
    storageUserTable: string | null;
}
