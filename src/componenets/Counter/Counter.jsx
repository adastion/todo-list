import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "./counterSlice";
import { Button } from "../../styles/Button.styles";

export function Counter() {
  const [stepValue, setStepValue] = useState(2);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  console.log(stepValue)

  const hendleAddStep = () => {
    dispatch(incrementByAmount(stepValue));
  };

  return (
    <div>
      <div>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <input
          type="text"
          value={stepValue}
          onChange={(event) => setStepValue(event.target.value)}
        />
        <Button onClick={hendleAddStep}>add step</Button>
      </div>
    </div>
  );
}
