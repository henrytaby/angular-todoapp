import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-todoapp';
  welcome = 'Hola';
  tasks    = [
    'Instalar el angular CLI',
    'Crear proyecto',
    'Crear Componentes'
  ];

}
