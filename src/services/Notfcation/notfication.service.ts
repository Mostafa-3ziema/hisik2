import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
@Injectable()
export class NotficationService{
    constructor(private firebase :Firebase,private afs:AngularFirestore,private platform:Platform)
    {

    }

    async getToken()
    {
        let token;
        
        if(this.platform.is('android'))
        {
            token = await this.firebase.getToken();
        }
        if (this.platform.is('ios'))
        {
            token = await this.firebase.getToken();
            await this.firebase.grantPermission();
        }
        console.log(token);
        return this.saveTokenToFirestore(token);
    }
    private saveTokenToFirestore(token)
    {
        if (!token)
        {
            return
        }
        const deviceref = this.afs.collection('devices');

        const docdata={
            token ,
            userId:'testUser',
        }
    
        return deviceref.doc(token).set(docdata);
    }
    listenToNotfication()
    {
        return this.firebase.onNotificationOpen()
    }
}