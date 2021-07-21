import { Component, OnInit } from '@angular/core';
import {Electrodomestico} from "../../model/electrodomestico";
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  electrodomesticos: any = [{
    id: '',
    data: {} as Electrodomestico
  }];

  constructor(private firestoreservice: FirestoreService) {
    firestoreservice.read('electrodomestico').subscribe((data)=>{
      this.electrodomesticos = [];
      data.forEach((datosElectrodomesticos: any)=>{
        this.electrodomesticos.push({
          id: datosElectrodomesticos.payload.doc.id,
          data: datosElectrodomesticos.payload.doc.data()
        });
      });
    });
  }



  ngOnInit() {
  }

}
