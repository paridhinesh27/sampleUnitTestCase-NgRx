import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import * as TodoActions from './actions';
import { ToDoService } from '../services/todo.service';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { TodoEffects } from './effects';

describe('TodoEffects', () => {
  let actions$: Observable<Action>;
  let effects: TodoEffects;
  let todoService: jasmine.SpyObj<ToDoService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ToDoService', ['featchTodo']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        { provide: ToDoService, useValue: spy },
        provideMockStore()
      ]
    });

    effects = TestBed.inject(TodoEffects);
    todoService = TestBed.inject(ToDoService) as jasmine.SpyObj<ToDoService>;
  });
  
  it('should return a loadTodosFailure action with an error message on failure', () => {
    const todos = [{ id: 1, todo: 'Todo 1', completed: false }];
    const action = TodoActions.loadTodos();
    const error = 'Error loading todos';
    const outcome = TodoActions.loadTodosFailure({ error });

    actions$ = hot('-a-', { a: action });
    const response = cold('-#|', {}, { message: error });
    todoService.featchTodo.and.returnValue(response);

    const expected = cold('--b', { b: outcome });

    expect(effects.loadTodos$).toBeObservable(expected);
  });

  it('should return a loadTodosSuccess action with todos on success', () => {
    const action = TodoActions.loadTodos();
    const todos = [{ id: 1, todo: 'Todo 1', completed: false }];
    const outcome = TodoActions.loadTodosSuccess({ todos });

    actions$ = hot('-a-', { a: action });
    const response = cold('-a|', { a: {todos} });
    todoService.featchTodo.and.returnValue(response);

    const expected = cold('--b', { b: outcome });

    expect(effects.loadTodos$).toBeObservable(expected);
  });
});
