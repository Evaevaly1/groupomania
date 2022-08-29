import React, {useContext, useEffect, useRef, useState} from 'react';
import {UserActionTypes, UserContext} from "./UserContext";
import {AuthContextActionTypes, AuthContext} from "./AuthContext";
import {AuthActionTypes} from "./AuthContext";
import {useNavigate} from "react-router-dom";

const baseURL = "http://localhost:3001/api/";

export const useCustomMutation = () => {
    const isCurrent = useRef(true);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState();
    let _headers = {
        "Content-Type": "application/json",
    };
    const {userState, dispatchUser} = useContext(UserContext);
    const { dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        return () => {
            isCurrent.current = false;
        };
    }, []);

    const apiCall = async (endpoint, body) => {
        setLoading(true);
        try {
            const token = userState.token;
            if (token) {
                _headers = {'Authorization': 'Bearer ' + token, ..._headers};
            }
            const data = await fetch(baseURL + endpoint,
                {
                    method: 'POST',
                    headers: {..._headers},
                    body: JSON.stringify(body)
                });
            if (data.status) {
                if (data.status == 401) {
                    dispatchUser({type: UserActionTypes.Reset});
                    dispatch({type: AuthActionTypes.SetIsLogged, value: false});
                    navigate('/');
                }
            }
            const responseJson = await data.json();
            setResponse(responseJson);
            return responseJson;
        } catch (error) {
            setLoading(false);
            throw JSON.stringify(error);
        }
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return [apiCall, {response, loading}];
};

export const useCustomQuery = () => {
    const isCurrent = useRef(true);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState();
    const {userState, dispatchUser} = useContext(UserContext);
    const { dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    let _headers = {
        "Content-Type": "application/json",
    };

    useEffect(() => {
        return () => {
            isCurrent.current = false;
        };
    }, []);

    const getCall = async (endpoint, body) => {
        try {
            setLoading(true);
            // console.log(loading);
            let queryString = '?';
            for(let key in body){

                if(!body.hasOwnkey())continue
                queryString = queryString+ key + '=' +body[key]+'&';
            }
            const token = userState.token;
            if (token) {
                _headers = {'Authorization': 'Bearer ' + token, ..._headers};
            }
            const data = await fetch(baseURL + endpoint + queryString,
                {
                    method: 'GET',
                    headers: {..._headers},
                });
            if (data.status) {
                if (data.status == 401) {
                    dispatchUser({type: UserActionTypes.Reset});
                    dispatch({type: AuthActionTypes.SetIsLogged, value: false});
                    navigate('/');
                }
            }
            const responseJson = await data.json();
            setResponse(responseJson);
            setLoading(false);
            return responseJson;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return [getCall, {response, loading}];
};

export const useCustomMutationDelete = () => {
    const isCurrent = useRef(true);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState();
    const {userState, dispatchUser} = useContext(UserContext);
    const { dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    let _headers = {
        "Content-Type": "application/json",
    };

    useEffect(() => {
        return () => {
            isCurrent.current = false;
        };
    }, []);

    const apiCall = async (endpoint, id) => {
        setLoading(true);
        try {
            const token = userState.token;
            if (token) {
                _headers = {'Authorization': 'Bearer ' + token, ..._headers};
            }
            const data = await fetch(baseURL + endpoint + '/' + id,
                {
                    method: 'DELETE',
                    headers: {..._headers},
                });
            if (data.status) {
                if (data.status == 401) {
                    dispatchUser({type: UserActionTypes.Reset});
                    dispatch({type: AuthActionTypes.SetIsLogged, value: false});
                    navigate('/');
                }
            }
            const responseJson = await data.json();
            setResponse(responseJson);
            return responseJson;
        } catch (error) {
            setLoading(false);
            throw JSON.stringify(error);
        }
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return [apiCall, { response, loading }];
};

export const useCustomMutationUpdate = () => {
    const isCurrent = useRef(true);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState();
    let _headers = {
        "Content-Type": "application/json",
    };
    const {userState, dispatchUser} = useContext(UserContext);
    const { dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        return () => {
            isCurrent.current = false;
        };
    }, []);

    const apiCall = async (endpoint, body) => {
        setLoading(true);
        try {
            const token = userState.token;
            if (token) {
                _headers = {'Authorization': 'Bearer ' + token, ..._headers};
            }
            const data = await fetch(baseURL + endpoint,
                {
                    method: 'PUT',
                    headers: {..._headers},
                    body: JSON.stringify(body)
                });
            if (data.status) {
                if (data.status == 401) {
                    dispatchUser({type: UserActionTypes.Reset});
                    dispatch({type: AuthActionTypes.SetIsLogged, value: false});
                    navigate('/');
                }
            }
            const responseJson = await data.json();
            setResponse(responseJson);
            return responseJson;
        } catch (error) {
            setLoading(false);
            throw JSON.stringify(error);
        }
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return [apiCall, {response, loading}];
}
