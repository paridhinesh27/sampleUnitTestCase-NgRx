import { Action, ActionReducer } from "@ngrx/store";

export interface Todo {
    id: number | string;
    todo: string;
    completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string;
}

export interface AppState {
  todo: TodoState
}

export interface AppStore {
  todo: ActionReducer<TodoState, Action>;
}