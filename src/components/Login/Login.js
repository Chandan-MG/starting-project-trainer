import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.val,  isValid: action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.value,  isValid: state.value.includes('@')};
  }
  return { value: '',  isValid: false};
}

const passwordReducer = (state, action) => {
  if(action.type === 'PASSWORD_INPUT'){
    return { value: action.val,  isValid: action.val.includes('@')};
  }
  if(action.type === 'PASSWORD_BLUR'){
    return { value: state.value,  isValid: state.value.includes('@')};
  }
  return { value: '',  isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //useReducer
  const [emailState, dispatchEmailFunction] = useReducer(emailReducer, {
    value : '',
    isValid: null,//you can change this to false also, it leads to blur field
  });

  const [passwordState, dispatchPasswordFunction] = useReducer(passwordReducer, {
    value : '',
    isValid: null,//you can change this to false also, it leads to blur field
  });

  //useEffect code
  // useEffect( () => {
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   //cleanup
  //   return ( () => {
  //     console.log("TIME OUT");
  //     clearTimeout(identifier);
  //   });
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmailFunction({type: 'USER_INPUT', val: event.target.value})
    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordFunction({type: 'PASSWORD_INPUT', val: event.target.value});
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );

  };

  const validateEmailHandler = () => {
    dispatchEmailFunction({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPasswordFunction({type: 'PASSWORD_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
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
