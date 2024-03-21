import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut: () => {},
    onLogIn: (email,password) => {}
});

export const AuthContextProvider = (props) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false); 

    useEffect( () => {
        const storedUserLoginName = localStorage.getItem('isLoggedIn');
    
        if(storedUserLoginName === '1'){
          setIsLoggedIn(true); 
        }
    }, []);

    const logoutHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(false);
    }
    const loginHandler = () =>{
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(true);
    }
    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogOut: logoutHandler, onLogIn: loginHandler}} >{props.children}</AuthContext.Provider>
}
export default AuthContext;