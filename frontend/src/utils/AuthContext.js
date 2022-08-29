import React, {createContext, useReducer} from 'react';

const initialState = {isLogged: (localStorage.getItem('isLogged') === 'true') || false};
const AuthContext = createContext(initialState);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
    const [auth, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case AuthActionTypes.SetIsLogged:
                localStorage.setItem('isLogged', action.value);
                return {...state, isLogged: action.value};
            case AuthActionTypes.Reset:
                localStorage.setItem('isLogged', false);
                return initialState;
            default:
                return state;
        }
    }, initialState);
    return <Provider value={{auth: auth, dispatch}}>{children}</Provider>;
};

export const AuthActionTypes = {
    SetIsLogged: '@Auth/SetIsLogged',
    Reset: '@Auth/Reset',
};
export {AuthContext, AuthProvider}
