import { Injectable } from "@angular/core";
import { UserModel } from "..";

@Injectable({
    providedIn: "root",
})
export class UserFactory {
    public set factoryFunction(factoryFunction: () => any) {
        this.privFactoryFunction = factoryFunction;
    }

    public create() {
        return this.privFactoryFunction();
    }
    private privFactoryFunction: () => any = () => {
        return new UserModel();
    };
}
