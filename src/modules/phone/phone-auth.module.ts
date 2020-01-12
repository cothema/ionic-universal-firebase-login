import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { PhoneAuth } from "./phone-auth";

@NgModule({
    imports: [AngularFirestoreModule, IonicModule],
    providers: [PhoneAuth],
})
export class PhoneAuthModule {}
