import { todoReducer, initialState } from './reducers';
import * as TodoActions from './actions';
import { TodoState, Todo } from '../model/todoModel';

describe('Todo Reducer', () => {

  it('should return the initial state for unknown action', () => {
    const action = {} as any;
    const state = todoReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set loading to true on loadTodos action', () => {
    const action = TodoActions.loadTodos();
    const state = todoReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  it('should set todos and loading to false on loadTodosSuccess action', () => {
    const todos: Todo[] = [
      { id: 1, todo: 'Todo 1', completed: false },
      { id: 2, todo: 'Todo 2', completed: true }
    ];
    const action = TodoActions.loadTodosSuccess({ todos });
    const state = todoReducer(initialState, action);

    expect(state.todos).toEqual(todos);
    expect(state.loading).toBe(false);
  });

  it('should set error and loading to false on loadTodosFailure action', () => {
    const error = 'Error loading todos';
    const action = TodoActions.loadTodosFailure({ error });
    const state = todoReducer(initialState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should add a todo on addTodo action', () => {
    const todo: Todo = { id: 1, todo: 'Todo 1', completed: false };
    const action = TodoActions.addTodo({ todo });
    const state = todoReducer(initialState, action);

    expect(state.todos.length).toBe(1);
    expect(state.todos[0]).toEqual(todo);
  });

  it('should update a todo on updateTodo action', () => {
    const initial: TodoState = {
      todos: [{ id: 1, todo: 'Todo 1', completed: false }],
      loading: false,
      error: ''
    };
    const updatedTodo: Todo = { id: 1, todo: 'Updated Todo 1', completed: true };
    const action = TodoActions.updateTodo({ todo: updatedTodo });
    const state = todoReducer(initial, action);

    expect(state.todos.length).toBe(1);
    expect(state.todos[0]).toEqual(updatedTodo);
  });

  it('should update a todo on updateTodo action else', () => {
    const initial: TodoState = {
      todos: [{ id: 4, todo: 'Todo 1', completed: false }],
      loading: false,
      error: ''
    };
    const updatedTodo: Todo = { id: 1, todo: 'Updated Todo 1', completed: true };
    const action = TodoActions.updateTodo({ todo: updatedTodo });
    const state = todoReducer(initial, action);

    expect(state.todos.length).toBe(1);
    expect(state.todos[0]).toEqual(initial.todos[0]);
  });

  it('should delete a todo on deleteTodo action', () => {
    const initial: TodoState = {
      todos: [
        { id: 1, todo: 'Todo 1', completed: false },
        { id: 2, todo: 'Todo 2', completed: true }
      ],
      loading: false,
      error: ''
    };
    const action = TodoActions.deleteTodo({ id: 1 });
    const state = todoReducer(initial, action);

    expect(state.todos.length).toBe(1);
    expect(state.todos[0].id).toBe(2);
  });
});
