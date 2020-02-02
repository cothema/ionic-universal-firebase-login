import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf,
} from "@angular/core";
import { StorageUserModel, UserModel } from "..";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigDefaults } from "../config/uni-firebase-login-config-defaults";
import { IUniFirebaseLoginConfig } from "../services/i-uni-firebase-login-config";

@NgModule({
    declarations: [],
    exports: [],
    imports: [],
    providers: [],
})
export class UniFirebaseLoginModule<
    User extends UserModel = UserModel,
    StorageUser extends StorageUserModel = StorageUserModel
> {
    public static forRoot(
        config: Partial<IUniFirebaseLoginConfig> = {},
    ): ModuleWithProviders<UniFirebaseLoginModule> {
        const mergedConfig = Object.assign(
            new UniFirebaseLoginConfigDefaults(),
            config,
        );
        return {
            ngModule: UniFirebaseLoginModule,
            providers: [
                { provide: UniFirebaseLoginConfig, useValue: mergedConfig },
            ],
        };
    }

    public static forChild(): ModuleWithProviders<UniFirebaseLoginModule> {
        return {
            ngModule: UniFirebaseLoginModule,
            providers: [{ provide: UniFirebaseLoginConfig }],
        };
    }

    public constructor(
        @Optional() @SkipSelf() parentModule: UniFirebaseLoginModule,
    ) {
        if (parentModule) {
            throw new Error(
                "UniFirebaseLoginModule is already loaded. Import it in the AppModule only",
            );
        }
    }
}
