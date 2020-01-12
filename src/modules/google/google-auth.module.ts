import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { IonicModule } from "@ionic/angular";
import { GoogleAuth } from "./google-auth";

@NgModule({
    imports: [AngularFirestoreModule, AngularFireAuthModule, IonicModule],
    providers: [GoogleAuth, GooglePlus],
})
export class GoogleAuthModule {}
