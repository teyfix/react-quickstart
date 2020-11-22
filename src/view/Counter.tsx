import Button from '@cmp/ui/Button';
import store from '@store';
import { decrement, increment } from '@store/counter';
import React from 'react';
import { useSelector } from 'react-redux';

const Counter: React.FC = () => {
  const counter = useSelector<RootState>((state) => state.counter);

  return (
    <>
      <h1>Counter</h1>
      <p>You have clicked {counter} times!</p>
      <Button onClick={() => store.dispatch(increment())}>plus one!</Button>
      <Button onClick={() => store.dispatch(decrement())}>minus one!</Button>
    </>
  );
};

export default Counter;
