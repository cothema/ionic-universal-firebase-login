import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user-model';
import { AuthProvider } from '../providers/auth-provider';
import { IAuthProvider } from '../providers/i-auth-provider';
import { StorageProvider } from '../storage/storage-provider';
import { IAuthOptions } from './i-auth-options';
import { IAuthProviderOptions } from './i-auth-provider-options';
import { IAuthService } from './i-auth-service';

@Injectable({
    providedIn: 'root',
})
export class BaseAuthService<User extends UserModel = UserModel>
    implements IAuthService {
    public options: IAuthOptions = {
        afterLoginPage: '/',
        loginPage: '/login',
        storage: false,
        storageUserTable: 'users',
    };
    public providerOptions: IAuthProviderOptions = {
        google: {
            offline: true,
            scopes: 'profile email',
            webClientId: 'xxxxxx.apps.googleusercontent.com',
            signInType: 'popup'
        },
    };

    public constructor(
        protected router: Router,
        protected platform: Platform,
        protected authProvider: AuthProvider,
        protected storageProvider: StorageProvider<User>,
    ) {
        this.storageProvider.options.storage = this.options.storage;
        this.storageProvider.options.userTable = this.options.storageUserTable;
    }

    public async signInByProvider(
        provider: IAuthProvider,
        storeInDb = false,
    ): Promise<auth.UserCredential | null> {
        const credential = await provider.handleLogin();
        if (storeInDb && credential && credential.user !== null) {
            await this.storageProvider
                .getProvider()
                .updateStoredDataByFirebaseUser(credential.user);
        }
        this.onAfterLogin();
        return credential;
    }

    public async signInAnonymously(storeInDb = false): Promise<any> {
        return this.signInByProvider(this.authProvider.authAnonymous);
    }

    public async signInViaEmail(storeInDb = false): Promise<any> {
        return this.signInByProvider(this.authProvider.authEmail);
    }

    public async signInViaFacebook(storeInDb = false): Promise<any> {
        return this.signInByProvider(this.authProvider.authFacebook);
    }

    public async signInViaGithub(storeInDb = false): Promise<any> {
        return this.signInByProvider(this.authProvider.authGithub);
    }

    public async signInViaGoogle(storeInDb = false): Promise<any> {
        return this.signInByProvider(this.authProvider.authGoogle);
    }

    public async signInViaPhone(storeInDb = false): Promise<any> {
        return this.signInByProvider(this.authProvider.authPhone);
    }

    public async signInViaTwitter(storeInDb = false): Promise<any> {
        return this.signInByProvider(this.authProvider.authTwitter);
    }

    /**
     * Handle sign out request
     */
    public async signOut(): Promise<void> {
        this.authProvider;
        this.onAfterSignOut();
    }

    /**
     * Get user profile data
     */
    public getUser(): Observable<unknown | User | null> {
        return this.storageProvider.getUser();
    }

    protected onAfterSignOut() {
        if (this.options.loginPage) {
            this.router.navigate([this.options.loginPage]);
        }
    }

    protected onAfterLogin() {
        if (this.options.afterLoginPage) {
            this.router.navigate([this.options.afterLoginPage]);
        }
    }
}
