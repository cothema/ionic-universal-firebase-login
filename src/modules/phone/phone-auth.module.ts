import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { PhoneAuth } from "./phone-auth";

@NgModule({
  imports: [AngularFirestoreModule, AngularFireAuthModule, IonicModule],
  providers: [PhoneAuth],
})
export class PhoneAuthModule {}
