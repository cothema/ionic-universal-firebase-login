export class FirebaseUserModel {
    public uid?: string;
    public email?: string;
    public photoURL?: string;
    public displayName?: string;

    public constructor(init?: Partial<FirebaseUserModel>) {
        Object.assign(this, init);
    }
}
