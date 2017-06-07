import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { TodoModel } from "../../shared/todo-model"
import { TodoServiceProvider } from "../../shared/todo-service"
import { AddTaskModalPage } from "../add-task-modal/add-task-modal"

/**
 * Generated class for the TodosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  public todos: TodoModel[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public todoService: TodoServiceProvider) {}

  ionViewDidLoad() {}

  setTodoStyles(item:TodoModel){
    let styles = {
        'text-decoration' : item.isDone ? 'line-through' : 'none',
        'font-weight' : item.isImportant ? '600' : 'normal'
    }
    return styles;
  }

  toogleTodo(todo:TodoModel){
    this.todoService.toogleTodo(todo);
  }

  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss(data => { 
      if(data){
        this.todoService.addTodo(data);
      }
    });
  }

  showEditTodo(todo: TodoModel){
    let modal = this.modalCtrl.create(AddTaskModalPage,{todo});
    modal.present();

    modal.onDidDismiss(data =>{
      if(data){
        this.todoService.updateTodo(todo,data);
      }
    })
  }

  removeTodo(todo:TodoModel){
    this.todoService.removeTodo(todo);
  }

}