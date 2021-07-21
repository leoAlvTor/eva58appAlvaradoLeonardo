import { Component, OnInit } from '@angular/core';
import {Electrodomestico} from '../../model/electrodomestico';
import {FirestoreService} from "../../services/firestore.service";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {finalize, tap} from "rxjs/operators";


export interface FILE{
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  fileUploadedPath: Observable<string>;
  files: Observable<FILE[]>;
  FileName: string;
  FileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  electrodomestico: Electrodomestico;
  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;

  constructor(private servicio: FirestoreService, private angularFirestore: AngularFirestore,
              private angularFireStorage: AngularFireStorage) {
    this.electrodomestico = new Electrodomestico();
    this.isImgUploading = false;
    this.isImgUploaded = false;
    this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();
  }

  ngOnInit() {
  }



  async fileUpload(event: FileList) {

    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    const imageRef = this.angularFireStorage.ref(fileStoragePath);

    const snap = await this.angularFireStorage.upload(fileStoragePath, file);
    this.getDownloadPath(snap);

  }

  async getDownloadPath(snap){
    const url = await snap.ref.getDownloadURL();
    this.electrodomestico.image = url;
  }


  crearRegistro(){
    this.servicio.create('electrodomestico', JSON.parse(JSON.stringify(this.electrodomestico))).then(result =>{
      if(result) {
        console.log('Se creo el registro correctamente...');
      }
    });
  }

}
