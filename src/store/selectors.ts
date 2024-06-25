import {  createSelector } from "@ngrx/store"
import { AppState, TodoState } from "../model/todoModel";
 

const feature = (state: AppState) => state.todo;

export const todoSelector = createSelector(
  feature,
  (state: TodoState) => state.todos
);