type Reducer<S, T, P> = (state: S, action: Action<T, P>) => void;
type Action<T, P = never> = { type: T; payload?: P };

interface RootState {
  counter: number;
}
