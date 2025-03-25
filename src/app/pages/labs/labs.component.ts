import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola';
  tasks    = signal( [
    'Instalar el angular CLI',
    'Crear proyecto',
    'Crear Componentes'
  ]);
  name = signal('Henry Alejandro');
  age = 45;
  disabled = true;
  img = "https://www.google.com.co/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
  person = signal( {
    name: 'henry',
    age: 45,
    avatar: 'https://www.google.com.co/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
  });

  colorCtrl = new FormControl();
  widthCrtrl = new FormControl(50,{
    nonNullable: true
  });

  nameCtrl = new FormControl('henry',{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe((value)=>{
      console.log(value);
    });
  }

  clickHandler() {
    console.log('Click en el boton');
  }
  changeHandler(event:Event) {
    //console.log((event.target as HTMLInputElement).value);

    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
    console.log(this.name());
  }

  changeAge(event:Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((person)=>({...person, age: parseInt(newValue,10)}));
  }

  changeName(event:Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((person)=>({...person, name: newValue}));
  }

  keydownHandler(event:KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
