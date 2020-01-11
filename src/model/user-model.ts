export class UserModel {
    public uid?: string;
    public email?: string;
    public photoURL?: string;
    public displayName?: string;

    public constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
}
