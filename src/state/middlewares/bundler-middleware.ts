import { Middleware } from "./middleware";

let timer: any;

export const bundlerMiddleware: Middleware = store => next => action => {
  next(action);
  clearTimeout(timer);
  timer = setTimeout(() => {
    
  }, 1000);
}