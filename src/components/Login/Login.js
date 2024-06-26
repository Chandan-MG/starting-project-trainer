import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../stores/auth-context';
import Input from '../UI/Input/Input';

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

  const authCtx = useContext(AuthContext);
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
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="emsil" 
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
