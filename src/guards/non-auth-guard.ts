import { Injectable } from "@angular/core";
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Params,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { BaseAuthService } from "../services/base-auth-service";
import { IGuard } from "./i-guard";

@Injectable({
    providedIn: "root",
})
export class NonAuthGuard<User extends UserModel = UserModel>
    implements CanActivate, CanActivateChild, IGuard<User> {
    protected config: UniFirebaseLoginConfig;

    public constructor(
        protected auth: BaseAuthService<User>,
        protected route: ActivatedRoute,
        protected router: Router,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        this.config = configProvider.config;
    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return new Observable(subscriber => {
            this.auth.userInitialized$.subscribe(initialized => {
                if (initialized) {
                    this.auth.user$.subscribe(user => {
                        const isLoggedIn = !!user;
                        if (isLoggedIn) {
                            this.handleAccessDeniedRedirect(route, state).then(() => {
                                subscriber.next(false);
                                subscriber.complete();
                            });
                        } else {
                            subscriber.next(true);
                            subscriber.complete();
                        }
                    });
                }
            });
        });
    }

    public canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return this.canActivate(next, state);
    }

    public async handleAccessDeniedRedirect(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Promise<void> {
        console.log(`Access denied (NonAuthGuard): ${state.url}`);

        let queryParams: Params | undefined;
        if (this.config.redirectBack) {
            queryParams = this.route
                .snapshot
                .queryParams;
        }

        if (queryParams && queryParams["redirectBack"]) {
            console.log(`Redirect back: ${queryParams.redirectBack}`);
            await this.router.navigate([queryParams.redirectBack]);
        } else if (this.config.afterSignInPage) {
            console.log(`Redirect: ${this.config.afterSignInPage}`);
            await this.router.navigate([this.config.afterSignInPage]);
        }
    }
}
