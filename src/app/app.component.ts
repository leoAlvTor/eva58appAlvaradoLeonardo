import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Crear Registro', url: 'create', icon: 'mail' },
    { title: 'Listar Registros', url: 'view', icon: 'paper-plane' },

  ];
  constructor() {}
}
