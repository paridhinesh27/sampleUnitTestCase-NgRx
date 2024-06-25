import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs/internal/observable/of";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ToDoService } from "../services/todo.service";
import * as TodoActions from './actions';

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() => {
        return this.todoService.featchTodo().pipe(
          map((todos) => {
              return TodoActions.loadTodosSuccess({ todos: todos?.todos })
            }),
          catchError((error) =>
            of(TodoActions.loadTodosFailure({ error: error.message }))
          )
        )
}
      )
    )
  );
  constructor(private actions$: Actions, private todoService: ToDoService) {}
}