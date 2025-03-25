import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from './../../models/task.models';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks    = signal<Task[]>( [
    {
      id: Date.now(),
      title: 'Instalar el angular CLI',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear Componentes',
      completed: false
    }
  ]);


  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {

    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === 'pending') {
      return tasks.filter((task)=>!task.completed);
    }
    if(filter === 'completed') {
      return tasks.filter((task)=>task.completed);
    }
    return tasks;
  });

  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3)
    ]
  });

  changeHandler() {
    if(this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      this.addTask(value)
      this.newTaskCtrl.setValue('');
    }
  }

  addTask(title:string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks)=>[...tasks, newTask]);
  }

  deleteTask(index:number) {
    this.tasks.update((tasks)=>tasks.filter((_, i)=>i !== index));
  }

  updateTask(index:number) {
    this.tasks.update((tasks)=>tasks.map((task, i)=>{
      if(i === index) {
        return {...task, completed: !task.completed}
      }
      return task;
    }));
  }

  updateTaskEditingMode(index:number) {
    console.log("entro");
    this.tasks.update((tasks)=>tasks.map((task, i)=>{
      if(i === index) {
        return {...task, editing: true}
      }
      return {
        ...task,
        editing: false
      };
    }));
  }


  updateTaskText(index:number, event:Event) {
    const input = event.target as HTMLInputElement;
    console.log("entro");
    this.tasks.update((tasks)=>tasks.map((task, i)=>{
      if(i === index) {
        return {
          ...task, title: input.value.trim(),
          editing: false
        }
      }
      return task;
    }));
  }


  changeFilter(filter:'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

}
