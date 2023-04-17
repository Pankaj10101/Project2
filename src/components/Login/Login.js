import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

// emailReducer
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

// passwordReducer
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

// collegeReducer
const collegeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val !== "" };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value !== "" };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        collegeState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 6 &&
        collegeState.isValid
    );
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      emailState.isValid && passwordState.isValid && event.target.value !== ""
    );
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
        />
        <div>
          <label htmlFor="college">Select College</label>
          <select
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          >
            <option value="">Select</option>
            <option value="CU">CU</option>
            <option value="LPU">LPU</option>
            <option value="GNE">GNE</option>
          </select>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
