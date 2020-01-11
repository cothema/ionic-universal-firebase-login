import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { IonicModule } from "@ionic/angular";
import { GoogleAuth } from "./google-auth";

@NgModule({
    imports: [AngularFirestoreModule, IonicModule],
    providers: [GoogleAuth, GooglePlus],
})
export class GoogleAuthModule {}
