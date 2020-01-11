import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { GithubAuthentication } from "../providers/github-authentication";

@NgModule({
    imports: [AngularFirestoreModule, AngularFireAuthModule, IonicModule],
    providers: [GithubAuthentication],
})
export class GithubAuthModule {}
