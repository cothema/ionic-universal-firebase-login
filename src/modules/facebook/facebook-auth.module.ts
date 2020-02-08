import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { Facebook } from "@ionic-native/facebook/ngx";
import { IonicModule } from "@ionic/angular";
import { FacebookAuth } from "./facebook-auth";

@NgModule({
  imports: [AngularFirestoreModule, AngularFireAuthModule, IonicModule],
  providers: [FacebookAuth, Facebook],
})
export class FacebookAuthModule {}
