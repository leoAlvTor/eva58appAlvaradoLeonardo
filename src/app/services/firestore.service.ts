import { Injectable } from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService  {

  constructor(private angularFirestore: AngularFirestore) { }

  public create(coleccion, datos){
    return this.angularFirestore.collection(coleccion).add(datos);
  }

  public read(coleccion){
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }

  public async readById(coleccion, docId){
    return await this.angularFirestore.collection(coleccion).doc(docId).get().toPromise();
  }

  public update(coleccion, docId, datos){
    return this.angularFirestore.collection(coleccion).doc(docId).set(datos);
  }

  public delete(coleccion, docId){
    return this.angularFirestore.collection(coleccion).doc(docId).delete();
  }

}
