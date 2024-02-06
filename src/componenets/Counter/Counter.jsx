import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../styles/Button.styles";
import { FlexWrap } from "../../styles/FlexWrap";
import { Field } from "./../../styles/Field";
import { decrement, increment, incrementByAmount } from "./counterSlice";

export function Counter() {
  const [stepValue, setStepValue] = useState(2);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const hendleAddStep = () => {
    dispatch(incrementByAmount(stepValue));
  };

  return (
    <FlexWrap width={"100%"} justify={"center"}>
      <FlexWrap direction={"row"}>
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
      </FlexWrap>
      <Field
        width={"40px"}
        fontSize={"1rem"}
        padding={"0.5rem"}
        type="text"
        value={stepValue}
        onChange={(event) => setStepValue(event.target.value)}
      />
      <Button onClick={hendleAddStep}>add step</Button>
    </FlexWrap>
  );
}
