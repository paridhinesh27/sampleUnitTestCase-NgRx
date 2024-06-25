import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, Todo } from '../model/todoModel';
import * as TodoActions from '../store/actions';
import { todoSelector } from '../store/selectors';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<AppState>;
  let initialState: AppState;

  const mockTodos: Todo[] = [
    { id: 1, todo: 'description 1', completed: false },
    { id: 2, todo: 'description 2', completed: true },
    { id: 3, todo: 'description 3', completed: true },
  ];

  beforeEach(async () => {
    initialState = {
      todo: {
        todos: mockTodos,
        loading: false,
        error: ''
      }
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(todoSelector, mockTodos);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(component.todoListData.length).toBe(3);
    expect(component.todoListData).toEqual(mockTodos);
  });

  it('should dispatch loadTodos action when featchToDoList is called', () => {
    spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('#fetch-button');
    button.click();
    expect(store.dispatch).toHaveBeenCalledWith(TodoActions.loadTodos());
  });

  it('should dispatch addTodo action when addTodo is called', () => {
    spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('#add-btn');
    button.click();
    expect(store.dispatch).toHaveBeenCalledWith(TodoActions.addTodo({ todo: { id: 4, todo: 'description 4', completed: false } }));
  });

  it('should dispatch updateTodo action when complete is called', () => {
    spyOn(store, 'dispatch');
    const todo: Todo = { id: 1, todo: 'description 1', completed: false };
    component.complete(todo);
    expect(store.dispatch).toHaveBeenCalledWith(TodoActions.updateTodo({ todo: { ...todo, completed: true } }));
  });
});
