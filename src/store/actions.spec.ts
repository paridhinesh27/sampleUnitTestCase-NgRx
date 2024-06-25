import * as TodoActions from './actions';
import { Todo } from '../model/todoModel';

describe('Todo Actions', () => {

  it('should create a loadTodos action', () => {
    const action = TodoActions.loadTodos();
    expect(action.type).toBe('[Test] Load Todos');
  });

  it('should create a loadTodosSuccess action with todos', () => {
    const todos: Todo[] = [
      { id: 1, todo: 'Todo 1', completed: false },
      { id: 2, todo: 'Todo 2', completed: true }
    ];
    const action = TodoActions.loadTodosSuccess({ todos });
    expect(action.type).toBe('[Todo] Load Todos Success');
    expect(action.todos).toEqual(todos);
  });

  it('should create a loadTodosFailure action with error', () => {
    const error = 'Failed to load todos';
    const action = TodoActions.loadTodosFailure({ error });
    expect(action.type).toBe('[Todo] Load Todos Failure');
    expect(action.error).toBe(error);
  });

  it('should create an addTodo action with todo', () => {
    const todo: Todo = { id: 1, todo: 'Todo 1', completed: false };
    const action = TodoActions.addTodo({ todo });
    expect(action.type).toBe('[Todo] Add Todo');
    expect(action.todo).toEqual(todo);
  });

  it('should create an updateTodo action with todo', () => {
    const todo: Todo = { id: 1, todo: 'Todo 1', completed: true };
    const action = TodoActions.updateTodo({ todo });
    expect(action.type).toBe('[Todo] Update Todo');
    expect(action.todo).toEqual(todo);
  });

  it('should create a deleteTodo action with id', () => {
    const id = '1';
    const action = TodoActions.deleteTodo({ id });
    expect(action.type).toBe('[Todo] Delete Todo');
    expect(action.id).toBe(id);
  });
});
