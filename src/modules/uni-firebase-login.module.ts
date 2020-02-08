import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { IUniFirebaseLoginConfig } from "../services/i-uni-firebase-login-config";

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
  providers: [],
})
export class UniFirebaseLoginModule<User extends UserModel = UserModel> {
  public static forRoot(
    config: Partial<IUniFirebaseLoginConfig> = {},
  ): ModuleWithProviders<UniFirebaseLoginModule> {
    return {
      ngModule: UniFirebaseLoginModule,
      providers: [{ provide: UniFirebaseLoginConfig, useValue: config }],
    };
  }

  public static forChild(): ModuleWithProviders<UniFirebaseLoginModule> {
    return {
      ngModule: UniFirebaseLoginModule,
      providers: [{ provide: UniFirebaseLoginConfigProvider }],
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
