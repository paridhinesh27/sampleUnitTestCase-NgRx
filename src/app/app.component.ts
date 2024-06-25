import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Todo } from '../model/todoModel';
import * as TodoActions from '../store/actions';
import { todoSelector } from '../store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cm-ngrx';
  todoListData: Todo[] = []

  constructor(private store: Store<AppState>) {
    
  }

  private todoList$ = this.store.select(todoSelector).subscribe(value => {
    this.todoListData = value
  })

  ngOnInit() {
    console.log('ngOninit -> todoList', this.todoListData)
  }

  featchToDoList() {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo(index: number) {
    const todo: Todo = { id: index, todo: `description ${index}`, completed: false };
    this.store.dispatch(TodoActions.addTodo({ todo }));
  }

  complete(todo: Todo) {
    this.store.dispatch(
      TodoActions.updateTodo({ todo: { ...todo, completed: true } })
    );
  }
 
}

