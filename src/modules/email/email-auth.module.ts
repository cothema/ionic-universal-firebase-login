import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { IonicModule } from "@ionic/angular";
import { EmailAuth } from "./email-auth";

@NgModule({
    imports: [AngularFirestoreModule, IonicModule],
    providers: [EmailAuth],
})
export class EmailAuthModule {}
