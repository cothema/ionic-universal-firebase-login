import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { GithubAuth } from "./github-auth";

@NgModule({
  imports: [AngularFirestoreModule, AngularFireAuthModule, IonicModule],
  providers: [GithubAuth],
})
export class GithubAuthModule {}
