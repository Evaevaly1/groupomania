import React, {createContext, useReducer} from "react";

const initialState = {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
    userType: localStorage.getItem('userType')
};
const UserContext = createContext(initialState);
const {Provider} = UserContext;

const UserProvider = ({children}) => {
    const [userState, dispatchUser] = useReducer((state, action) => {
        switch (action.type) {
            case UserActionTypes.SetUserId:
                localStorage.setItem('userId', action.value);
                return {...state, userId: action.value};
            case UserActionTypes.SetToken:
                localStorage.setItem('token', action.value);
                return {...state, token: action.value};
            case UserActionTypes.SetUserType:
                localStorage.setItem('userType', action.value);
                return {...state, userType: action.value};
            case UserActionTypes.Reset:
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                localStorage.removeItem('userType');
                return initialState;
            default :
                return state;
        }
    }, initialState);
    return <Provider value={{userState, dispatchUser}}>{children}</Provider>
}

export const UserActionTypes = {
    SetUserId: '@User/SetUserId',
    SetToken: '@User/SetToken',
    SetUserType: '@User/SetUserType',
    Reset: '@User/Reset'
}
export {UserContext, UserProvider};
