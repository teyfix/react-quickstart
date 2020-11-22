enum CounterAction {
  Increment = 'incrementCounter',
  Decrement = 'decrementCounter',
}

const increment = (factor = 1) => ({
  type: CounterAction.Increment,
  payload: { factor },
});

const decrement = (factor = 1) => ({
  type: CounterAction.Decrement,
  payload: { factor },
});

const counter: Reducer<number, CounterAction, Record<'factor', number>> = (
  state = 0,
  { type, payload },
) => {
  switch (type) {
    case CounterAction.Increment:
      return state + (payload?.factor || 1);

    case CounterAction.Decrement:
      return state - (payload?.factor || 1);

    default:
      return state;
  }
};

export { increment, decrement };
export default counter;
