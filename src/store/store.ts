import { AppStore } from "../model/todoModel";
import { TodoEffects } from "./effects";
import { todoReducer } from "./reducers";

export const appStore: AppStore = {
    todo: todoReducer
  }
  
  export const appEffects = [TodoEffects];